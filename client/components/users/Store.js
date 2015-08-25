import { EventEmitter } from 'events';
import Promise from 'promise';
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
	getAll() {
		return new Promise((resolve, reject) => {
			if (cache.users) {
				return resolve(cache.users);
			}

			request('get', 'users').then(res => {
				cache.users = res;
				resolve(res);
			}, reject);
		});
	},

	getLatest() {
		return new Promise((resolve, reject) => {
			if (cache.latestUsers) {
				return resolve(cache.latestUsers);
			}

			UserStore.getAll().then(users => {
				const latestUsers = JSON.parse(localStorage.getItem('latestUsers')) || [];
				resolve(latestUsers.map(id => find(users, { id })).filter(x => x));
			}, reject);
		});
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

	[UserConstants.CREATE](data) {
		data.id = random.uuid();
		return request('post', 'users/', data);
	},

	[UserConstants.UPDATE](id, data) {
		return request('put', 'users/' + id, data);
	},

	[UserConstants.REMOVE](id) {
		return request('delete', 'users/' + id);
	},

	[UserConstants.MOVE](from, to) {
		return UserStore.getLatest().then(list => {
			const newList = list.map(x => x.id);
			arrange(newList, from, to);
			return updateLatestUsers(newList);
		});
	},

	[UserConstants.DO_LATEST](id) {
		return UserStore.getLatest().then(list => {
			const newList = list.map(x => x.id);

			if (newList.indexOf(id) >= 0) {
				return Promise.resolve();
			}

			newList.push(id);
			return updateLatestUsers(newList);
		});
	},

	[UserConstants.DO_NOT_LATEST](id) {
		return UserStore.getLatest().then(list => {
			const newList = list.map(x => x.id);

			if (newList.indexOf(id) < 0) {
				return Promise.resolve();
			}

			return updateLatestUsers(newList.filter(x => x !== id));
		});
	}

};

Dispatcher.register((action) => {
	const promise = UserHandlers[action.actionType].apply(null, action.args);
	action.next(promise).then(UserStore.emitChange.bind(UserStore));
});

export default UserStore;
