import Promise from 'promise';

import Dispatcher from 'utils/Dispatcher';
import UserConstants from 'components/users/Constants';

function makeAction(actionType) {
	return async function userAction() {
		const args = arguments;
		return await new Promise((resolve, reject) => {
			Dispatcher.dispatch({
				actionType,
				args,
				resolve,
				reject
			});
		});
	};
}

const UserActions = {
	create: makeAction(UserConstants.USER_CREATE),
	update: makeAction(UserConstants.USER_UPDATE),
	remove: makeAction(UserConstants.USER_REMOVE),
	move: makeAction(UserConstants.USER_MOVE),
	doLatest: makeAction(UserConstants.USER_DO_LATEST),
	doNotLatest: makeAction(UserConstants.USER_DO_NOT_LATEST)
};

export default UserActions;
