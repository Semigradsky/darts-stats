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
	getAll(fn) {
		cache.users ? fn(null, cache.users) :
			request('get', 'users',
				(err, res) => err ? fn(err) : (cache.users = res.body, fn(null, res.body))
			);
	},

	getLatest(fn) {
		if (cache.latestUsers) {
			return fn(null, cache.latestUsers);
		}

		UserStore.getAll((err, users) => {
			if (err) {
				return fn(err);
			}

			const latestUsers = JSON.parse(localStorage.getItem('latestUsers')) || [];

			fn(null, latestUsers.map(id => find(users, { id })).filter(x => x));
		});
	},

	get(id, fn) {
		request('get', 'users/' + id, (err, res) => fn(err, res.body));
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

const create = (data, fn) => {
	data.id = random.uuid();
	request('post', 'users/', data, err => fn(err, data.id));
};

const update = (id, data, fn) => {
	request('put', 'users/' + id, data, err => fn(err, id));
};

const remove = (id, fn) => {
	request('delete', 'users/' + id, err => fn(err, id));
};

const updateLatestUsers = (users, fn) => {
	try {
		localStorage.setItem('latestUsers', JSON.stringify(users));
		fn(null);
	} catch(e) {
		fn(e);
	}
};

const move = (from, to, fn) => {
	UserStore.getLatest((err, list) => {
		const newList = list.map(x => x.id);
		arrange(newList, from, to);
		updateLatestUsers(newList, fn);
	});
};

const doLatest = (id, fn) => {
	UserStore.getLatest((err, list) => {
		const newList = list.map(x => x.id);

		if (newList.indexOf(id) >= 0) {
			return fn(null, id);
		}

		newList.push(id);
		updateLatestUsers(newList, err => {
			err ? fn(err) : fn(null, id);
		});
	});
};

const doNotLatest = (id, fn) => {
	UserStore.getLatest((err, list) => {
		const newList = list.map(x => x.id);

		if (newList.indexOf(id) < 0) {
			return fn(null, id);
		}

		updateLatestUsers(newList.filter(x => x !== id), err => {
			err ? fn(err) : fn(null, id);
		});
	});
};

Dispatcher.register((action) => {
	switch (action.actionType) {
	case UserConstants.CREATE:
		create(action.data, (err, data) => {
			action.callback && action.callback(err, data);
			!err && UserStore.emitChange();
		});
		break;

	case UserConstants.UPDATE:
		update(action.id, action.data, (err, data) => {
			action.callback && action.callback(err, data);
			!err && UserStore.emitChange();
		});
		break;

	case UserConstants.REMOVE:
		remove(action.id, (err, data) => {
			action.callback && action.callback(err, data);
			!err && UserStore.emitChange();
		});
		break;

	case UserConstants.MOVE:
		move(action.from, action.to, (err, data) => {
			action.callback && action.callback(err, data);
			!err && UserStore.emitChange();
		});
		break;

	case UserConstants.DO_LATEST:
		doLatest(action.id, (err, data) => {
			action.callback && action.callback(err, data);
			!err && UserStore.emitChange();
		});
		break;

	case UserConstants.DO_NOT_LATEST:
		doNotLatest(action.id, (err, data) => {
			action.callback && action.callback(err, data);
			!err && UserStore.emitChange();
		});
		break;

	default:
		// do nothing
	}
});

export default UserStore;
