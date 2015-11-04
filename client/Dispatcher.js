import { Dispatcher } from 'flux';

import { GamesHandlers } from 'stores/games';
import { UsersHandlers } from 'stores/users';

const dispatcher = new Dispatcher();

function register(handlers) {
	dispatcher.register(async (action) => {
		if (!(action.actionType in handlers)) {
			return;
		}

		try {
			const res = await handlers[action.actionType].apply(null, action.args);
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
		register(GamesHandlers);
		register(UsersHandlers);
		done();
	}
};
