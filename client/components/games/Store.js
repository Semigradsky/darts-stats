import { EventEmitter } from 'events';

import random from 'utils/random';
import Dispatcher from 'utils/Dispatcher';
import request from 'utils/request';
import { actionNames as actions } from 'components/games/Actions';

const CHANGE_EVENT = 'change';

const cache = {};

const GameStore = Object.assign({}, EventEmitter.prototype, {
	async getAll() {
		if (cache.games) {
			return cache.games;
		}

		const res = await request('get', 'games');
		cache.games = res;
		return res;
	},

	async get(id) {
		return await request('get', 'games/' + id);
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

const GameHandlers = {

	async [actions.CREATE](data) {
		const game = {
			id: random.uuid(),
			players: data,
			state: 'IN PROGRESS'
		};
		return await request('post', 'games/', game);
	},

	async [actions.UPDATE](id, data) {
		return await request('put', 'games/' + id, data);
	},

	async [actions.REMOVE](id) {
		return await request('delete', 'games/' + id);
	}

};

Dispatcher.register(async (action) => {
	if (!(action.actionType in GameHandlers)) {
		return;
	}

	try {
		const res = await GameHandlers[action.actionType].apply(null, action.args);
		GameStore.emitChange();
		action.resolve(res);
	} catch (err) {
		action.reject(err);
	}
});

export default GameStore;
