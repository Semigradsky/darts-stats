import createActions from 'utils/ActionsFabric';

export const actionNames = {
	CREATE: Symbol(),
	REMOVE: Symbol(),
	UPDATE: Symbol()
};

export default createActions(actionNames, 'Games');
