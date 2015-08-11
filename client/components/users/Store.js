import { EventEmitter } from 'events';
import assign from 'react/lib/Object.assign';

import random from 'utils/random';
import Dispatcher from 'utils/Dispatcher';
import UserConstants from 'components/users/Constants';

const CHANGE_EVENT = 'change';

const create = (data, fn) => {
	data.id = random.uuid();
	const users = JSON.parse(localStorage.getItem('users')) || [];
	users.push(data);
	localStorage.setItem('users', users);
	fn(null, data.id);
};

const update = (id, data, fn) => {
	let users = JSON.parse(localStorage.getItem('users')) || [];
	users = users.map(user => user.id === id ? data : user);
	localStorage.setItem('users', users);
	fn(null, id);
};

const remove = (id, fn) => {
	let users = JSON.parse(localStorage.getItem('users')) || [];
	users = users.filter(user => user.id !== id);
	localStorage.setItem('users', users);
	fn(null, id);
};

const UserStore = assign({}, EventEmitter.prototype, {
	getAll(fn) {
		const users = JSON.parse(localStorage.getItem('users')) || [];
		fn(null, users);
	},

	getLatest(fn) {
		let users = JSON.parse(localStorage.getItem('users')) || [];
		users = users.filter(user => user.latest);
		fn(null, users);
	},

	get(id, fn) {
		const users = JSON.parse(localStorage.getItem('users')) || [];
		let user = null;
		users.some(u => u.id === id ? user = u : false);
		fn(null, user);
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

	default:
		// do nothing
	}
});

export default UserStore;
