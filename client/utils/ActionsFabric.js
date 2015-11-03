import Dispatcher from 'utils/Dispatcher';
import { toCamelCase } from 'utils/string';

function makeAction(actionType, actionName, type) {
	return async function userAction(...args) {
		console.log(`${type}Action: ${actionName}`, args); // eslint-disable-line no-console
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

export default (constants, type = '') => {
	const actions = {};
	for (const actionName of Object.keys(constants)) {
		actions[toCamelCase(actionName)] = makeAction(constants[actionName], actionName, type);
	}
	return actions;
};
