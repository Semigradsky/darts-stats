import { Dispatcher } from 'flux';

import { GamesStore, UsersStore } from 'stores';
import { GamesHandlers } from 'stores/games';
import { UsersHandlers } from 'stores/users';

const dispatcher = new Dispatcher();

function register(handlers, store) {
	dispatcher.register(async (action) => {
		if (!(action.actionType in handlers)) {
			return;
		}

		try {
			const func = handlers[action.actionType];
			const res = await func.apply(null, action.args);
			store.emitChange();
			action.resolve(res);
		} catch (err) {
			action.reject(err);
		}
	});
}

export default {
	dispatch(...args) {
		dispatcher.dispatch.apply(dispatcher, args);
	},
	run(done) {
		register(GamesHandlers, GamesStore);
		register(UsersHandlers, UsersStore);
		done();
	}
};
