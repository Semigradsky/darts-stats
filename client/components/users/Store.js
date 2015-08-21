import { EventEmitter } from 'events';
import assign from 'react/lib/Object.assign';
import async from 'async';

import random from 'utils/random';
import Dispatcher from 'utils/Dispatcher';
import request from 'utils/request';
import UserConstants from 'components/users/Constants';
import find from 'utils/find';

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
		cache.latestUsers ? fn(null, cache.latestUsers) :
			request('get', 'users?latest=true',
				(err, res) => err ? fn(err) : (cache.latestUsers = res.body, fn(null, res.body))
			);
	},

	getPositions(fn) {
		cache.positions ? fn(null, cache.positions) :
			request('get', 'latestPositions',
				(err, res) => err ? fn(err) : (cache.positions = res.body, fn(null, res.body))
		);
	},

	get(id, fn) {
		request('get', 'users/' + id, (err, res) => fn(err, res.body));
	},

	emitChange() {
		delete cache.users;
		delete cache.latestUsers;
		delete cache.positions;
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

const move = (from, to, fn) => {
	UserStore.getPositions((err, list) => {
		const fromItem = find(list, { id: from });
		const toItem = find(list, { id: to });

		console.log(fromItem);
		console.log(toItem);
		console.log('---');

		fn(null);
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

	default:
		// do nothing
	}
});

export default UserStore;
