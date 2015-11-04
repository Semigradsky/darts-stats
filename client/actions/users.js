import createActions from 'utils/ActionsFabric';

export const actionNames = {
	'CREATE': Symbol(),
	'REMOVE': Symbol(),
	'UPDATE': Symbol(),
	'MOVE': Symbol(),
	'DO_LATEST': Symbol(),
	'DO_NOT_LATEST': Symbol()
};

export default createActions(actionNames, 'Users');
