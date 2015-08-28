import { EventEmitter } from 'events';
import assign from 'react/lib/Object.assign';

import random from 'utils/random';
import Dispatcher from 'utils/Dispatcher';
import request from 'utils/request';
import UserConstants from 'components/users/Constants';
import find from 'utils/find';
import arrange from 'utils/arrange';

const CHANGE_EVENT = 'change';

const cache = {};

const UserStore = assign({}, EventEmitter.prototype, {
	async getAll() {
		if (cache.users) {
			return cache.users;
		}

		const res = await request('get', 'users');
		cache.users = res;
		return res;
	},

	async getLatest() {
		if (cache.latestUsers) {
			return cache.latestUsers;
		}

		const users = await UserStore.getAll();
		const latestUsers = JSON.parse(localStorage.getItem('latestUsers')) || [];
		return latestUsers.map(id => find(users, { id })).filter(x => x);
	},

	get(id) {
		return request('get', 'users/' + id);
	},

	emitChange() {
		delete cache.users;
		delete cache.latestUsers;
		this.emit(CHANGE_EVENT);
	},

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

const updateLatestUsers = users => {
	return new Promise((resolve, reject) => {
		try {
			localStorage.setItem('latestUsers', JSON.stringify(users));
			resolve();
		} catch(e) {
			reject(e);
		}
	});
};

const UserHandlers = {

	async [UserConstants.USER_CREATE](data) {
		data.id = random.uuid();
		return await request('post', 'users/', data);
	},

	async [UserConstants.USER_UPDATE](id, data) {
		return await request('put', 'users/' + id, data);
	},

	async [UserConstants.USER_REMOVE](id) {
		return await request('delete', 'users/' + id);
	},

	async [UserConstants.USER_MOVE](from, to) {
		let list = await UserStore.getLatest();
		list = list.map(x => x.id);
		arrange(list, from, to);
		return updateLatestUsers(list);
	},

	async [UserConstants.USER_DO_LATEST](id) {
		let list = await UserStore.getLatest();
		list = list.map(x => x.id);

		if (list.indexOf(id) >= 0) {
			return undefined;
		}

		list.push(id);
		return updateLatestUsers(list);
	},

	async [UserConstants.USER_DO_NOT_LATEST](id) {
		let list = await UserStore.getLatest();
		list = list.map(x => x.id);

		if (list.indexOf(id) < 0) {
			return undefined;
		}

		return updateLatestUsers(list.filter(x => x !== id));
	}

};

Dispatcher.register(async (action) => {
	try {
		const res = await UserHandlers[action.actionType].apply(null, action.args);
		UserStore.emitChange();
		action.resolve(res);
	} catch (err) {
		action.reject(err);
	}
});

export default UserStore;
