import Dispatcher from 'utils/Dispatcher';
import UserConstants from 'components/users/Constants';

const UserActions = {
	create(data, callback) {
		Dispatcher.dispatch({
			actionType: UserConstants.CREATE,
			data,
			callback
		});
	},

	update(id, data, callback) {
		Dispatcher.dispatch({
			actionType: UserConstants.UPDATE,
			id,
			data,
			callback
		});
	},

	doLatest(id, callback) {
		UserActions.update(id, { latest: true }, callback);
	},

	doNotLatest(id, callback) {
		UserActions.update(id, { latest: false }, callback);
	},

	remove(id, callback) {
		Dispatcher.dispatch({
			actionType: UserConstants.REMOVE,
			id,
			callback
		});
	}

};

export default UserActions;
