import { Dispatcher } from 'flux';

import { GamesStore, UsersStore, CurrentGameStore } from 'stores';
import { GamesHandlers } from 'stores/games';
import { UsersHandlers } from 'stores/users';
import { CurrentGameHandlers } from 'stores/currentGame';

const dispatcher = new Dispatcher();

function register(handlers, store) {
	dispatcher.register(async (action) => {
		if (!(action.actionType in handlers)) {
			return;
		}

		try {
			const res = await handlers[action.actionType].apply(null, action.args);
			store.emitChange();
			action.resolve(res);
		} catch (err) {
			action.reject(err);
		}
	});
}

export default {
	dispatch() {
		dispatcher.dispatch.apply(dispatcher, arguments);
	},
	run(done) {
		register(GamesHandlers, GamesStore);
		register(UsersHandlers, UsersStore);
		register(CurrentGameHandlers, CurrentGameStore);
		done();
	}
};
