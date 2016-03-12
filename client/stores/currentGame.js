import { EventEmitter } from 'events';

import { actionNames as actions } from 'actions/currentGame';
import { GamesStore } from 'stores';

const CHANGE_EVENT = 'change_current_game';

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
		.replace(/^\++/, '')
		.replace(/\++$/, '')
		.replace(/\s/g, '')
		.replace(/\+\+*/g, ' + ');
}

function evalThrows(throws) {
	return throws ? +eval(throws) : ''; // eslint-disable-line no-eval
}

const CurrentGameStore = Object.assign({}, EventEmitter.prototype, {

	async get(id) {
		if (cache.id === id) {
			return cache.game;
		}

		const game = await GamesStore.get(id);
		cache.id = id;
		cache.game = game;

		cache.game.rounds = cache.game.rounds.map(
			round => round.map(throws => ({
				throws,
				value: evalThrows(throws)
			}))
		);

		const lastRound = cache.game.rounds[cache.game.rounds.length - 1];

		if (!lastRound || roundFull(lastRound)) {
			cache.game.rounds = addRound(cache.game.rounds, game.players.length);
		}

		return cache.game;
	},

	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});

export const CurrentGameHandlers = {

	async [actions.ADD_ROUND]() {
		const game = cache.game;
		game.rounds = addRound(game.rounds, game.players.length);
	},

	async [actions.REMOVE_ROUND](round) {
		cache.game.rounds.splice(round, 1);
	},

	async [actions.UPDATE](roundPos, pos, throws) {
		const round = cache.game.rounds[roundPos];
		const lastRound = cache.game.rounds[cache.game.rounds.length - 1];
		const penultRound = cache.game.rounds[cache.game.rounds.length - 2];
		const formattedThrows = formatThrows(throws);

		round[pos] = {
			throws: formattedThrows,
			value: evalThrows(formattedThrows)
		};

		if (!formattedThrows && roundEmpty(round)) {
			if (round === lastRound && penultRound && roundFull(penultRound)) {
				return;
			}

			CurrentGameHandlers[actions.REMOVE_ROUND](roundPos);
			return;
		}

		if (!formattedThrows && round === penultRound && roundEmpty(lastRound)) {
			CurrentGameHandlers[actions.REMOVE_ROUND](cache.game.rounds.length - 1);
		}

		if (roundFull(round) && !roundEmpty(lastRound)) {
			CurrentGameHandlers[actions.ADD_ROUND]();
		}
	}

};

export default CurrentGameStore;
