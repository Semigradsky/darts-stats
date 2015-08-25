import Promise from 'promise';

import Dispatcher from 'utils/Dispatcher';
import UserConstants from 'components/users/Constants';

function makeAction(actionType) {
	return function userAction() {
		const args = arguments;
		return new Promise((resolve, reject) => {
			Dispatcher.dispatch({
				actionType,
				args,
				next: x => x.then(resolve, reject)
			});
		});
	};
}

const UserActions = {
	create: makeAction(UserConstants.CREATE),
	update: makeAction(UserConstants.UPDATE),
	remove: makeAction(UserConstants.REMOVE),
	move: makeAction(UserConstants.MOVE),
	doLatest: makeAction(UserConstants.DO_LATEST),
	doNotLatest: makeAction(UserConstants.DO_NOT_LATEST)
};

export default UserActions;
