import { EventEmitter } from 'events';

import random from 'utils/random';
import request from 'utils/request';
import { findIndex } from 'utils/collection';
import { actionNames as actions } from 'actions/games';
import { UsersStore } from 'stores';
import { GameStates } from 'constants/games';

import GameRounds from 'models/GameRounds';

const CHANGE_EVENT = 'change_game';

const cache = {};

const GamesStore = Object.assign({}, EventEmitter.prototype, {
	async getAll() {
		if (cache.games) {
			return cache.games;
		}

		const res = await request('get', 'games');
		cache.games = res;
		return res;
	},

	async get(id) {
		if (cache.id === id) {
			return cache.game;
		}

		const game = await request('get', `games/${id}`);

		cache.id = id;

		cache.game = game;
		cache.game.rounds = new GameRounds(game.players.length, game.rounds);
		cache.game.points = cache.game.rounds.getPoints();

		cache.game.players = await Promise.all(
			game.players.map(userId => UsersStore.get(userId))
		);

		return cache.game;
	},

	emitChange() {
		delete cache.games;
		this.emit(CHANGE_EVENT);
	},

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});

export const GamesHandlers = {

	async [actions.CREATE](data) {
		const game = {
			id: random.uuid(),
			players: data,
			state: GameStates.IN_PROGRESS,
			rounds: [Array(data.length).fill('')]
		};

		return await request('post', 'games/', game);
	},

	async [actions.UPDATE](id, data) {
		return await request('put', `games/${id}`, data);
	},

	async [actions.REMOVE](id) {
		return await request('delete', `games/${id}`);
	},

	async [actions.ADD_ROUND]() {
		cache.game.rounds.add();
	},

	async [actions.REMOVE_ROUND](round) {
		cache.game.rounds.remove(round);
	},

	async [actions.UPDATE_THROWS](roundPos, pos, throws) {
		cache.game.rounds.update(roundPos, pos, throws);
		cache.game.points = cache.game.rounds.getPoints();

		if (cache.game.points.some(x => x > 30)) {
			const winnerPos = findIndex(cache.game.points, x => x > 30);
			cache.game.winnerPos = winnerPos;
			cache.game.state = GameStates.READY;
		} else {
			if (cache.game.winnerPos !== undefined) {
				cache.game.winnerPos = undefined;
				cache.game.state = GameStates.IN_PROGRESS;
			}
		}
	},

	async [actions.CONTINUE]() {
		cache.game.state = GameStates.NOT_READY;
	},

	async [actions.FINISH]() {
		cache.game.state = GameStates.FINISH;
		await GamesHandlers[actions.SAVE]();
	},

	async [actions.SAVE]() {
		const data = Object.assign({}, cache.game);
		data.rounds = data.rounds.toApi();
		data.players = data.players.map(player => player.id);
		delete data.points;
		return await GamesHandlers[actions.UPDATE](cache.id, data);
	}

};

export default GamesStore;
