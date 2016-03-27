import { EventEmitter } from 'events';

import random from 'utils/random';
import request from 'utils/request';
import { findIndex } from 'utils/collection';
import { actionNames as actions } from 'actions/games';

const CHANGE_EVENT = 'change_game';

const cache = {};

function addRound(rounds, countPlayers) {
	const newRound = [];

	let i = countPlayers;
	while (i--) {
		newRound.push({
			throws: '',
			value: ''
		});
	}

	return rounds.concat([newRound]);
}

function roundFull(throws) {
	return throws.every(x => x.value !== '');
}

function roundEmpty(throws) {
	return throws.every(x => x.value === '');
}

function formatThrows(value) {
	return value
		.replace(/^\s*\++/, '')
		.replace(/\++\s*$/, '')
		.replace(/\s/g, '')
		.replace(/\+\+*/g, ' + ');
}

function evalThrows(throws) {
	return throws ? +eval(throws) : ''; // eslint-disable-line no-eval
}

function calculatePoints(rounds) {
	return rounds.reduce((acc, round) =>
		round.map((x, pos) => (acc[pos] || 0) + (x.value || 0))
	, []);
}

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

		cache.game.rounds = cache.game.rounds.map(
			round => round.map(throws => ({
				throws,
				value: evalThrows(throws)
			}))
		);

		cache.game.points = calculatePoints(cache.game.rounds);

		const lastRound = cache.game.rounds[cache.game.rounds.length - 1];

		if (!lastRound || roundFull(lastRound)) {
			cache.game.rounds = addRound(cache.game.rounds, game.players.length);
		}

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
			state: 'IN PROGRESS',
			rounds: []
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
		const game = cache.game;
		game.rounds = addRound(game.rounds, game.players.length);
	},

	async [actions.REMOVE_ROUND](round) {
		cache.game.rounds.splice(round, 1);
	},

	async [actions.UPDATE_THROWS](roundPos, pos, throws) {
		const round = cache.game.rounds[roundPos];
		const lastRound = cache.game.rounds[cache.game.rounds.length - 1];
		const penultRound = cache.game.rounds[cache.game.rounds.length - 2];
		const formattedThrows = formatThrows(throws);

		round[pos] = {
			throws: formattedThrows,
			value: evalThrows(formattedThrows)
		};

		cache.game.points = calculatePoints(cache.game.rounds);

		if (cache.game.points.some(x => x > 30)) {
			const winnerPos = findIndex(cache.game.points, x => x > 30);
			cache.game.winnerPos = winnerPos;
			cache.game.state = 'FINISH';
		} else {
			if (cache.game.winnerPos !== undefined) {
				cache.game.winnerPos = undefined;
				cache.game.state = 'IN PROGRESS';
			}
		}

		if (!formattedThrows && roundEmpty(round)) {
			if (round === lastRound && penultRound && roundFull(penultRound)) {
				return;
			}

			GamesHandlers[actions.REMOVE_ROUND](roundPos);
			return;
		}

		if (round === penultRound && !roundFull(penultRound) && roundEmpty(lastRound)) {
			GamesHandlers[actions.REMOVE_ROUND](cache.game.rounds.length - 1);
			return;
		}

		if (round === lastRound && roundFull(lastRound)) {
			GamesHandlers[actions.ADD_ROUND]();
		}
	},

	async [actions.SAVE]() {
		const data = Object.assign({}, cache.game);
		data.rounds = data.rounds.map(round => round.map(x => x.throws));
		return await GamesHandlers[actions.UPDATE](cache.id, data);
	}

};

export default GamesStore;
