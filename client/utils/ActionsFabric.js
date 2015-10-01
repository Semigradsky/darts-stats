import Dispatcher from 'utils/Dispatcher';
import { toCamelCase } from 'utils/string';

function makeAction(actionType) {
	return async function userAction(...args) {
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

export default (constants) => {
	const actions = {};
	for (const actionName of Object.keys(constants)) {
		actions[toCamelCase(actionName)] = makeAction(constants[actionName]);
	}
	return actions;
};
