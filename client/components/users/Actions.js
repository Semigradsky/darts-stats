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

	remove(id, callback) {
		Dispatcher.dispatch({
			actionType: UserConstants.REMOVE,
			id,
			callback
		});
	},

	move(from, to, callback) {
		Dispatcher.dispatch({
			actionType: UserConstants.MOVE,
			from,
			to,
			callback
		});
	},

	doLatest(id, callback) {
		Dispatcher.dispatch({
			actionType: UserConstants.DO_LATEST,
			id,
			callback
		});
	},

	doNotLatest(id, callback) {
		Dispatcher.dispatch({
			actionType: UserConstants.DO_NOT_LATEST,
			id,
			callback
		});
	}

};

export default UserActions;
