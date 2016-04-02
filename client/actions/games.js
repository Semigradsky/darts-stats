import createActions from 'utils/ActionsFabric';

export const actionNames = {
	CREATE: Symbol(),
	REMOVE: Symbol(),
	ADD_ROUND: Symbol(),
	REMOVE_ROUND: Symbol(),
	UPDATE_THROWS: Symbol(),
	UPDATE: Symbol(),
	SAVE: Symbol(),
	CONTINUE: Symbol(),
	FINISH: Symbol()
};

export default createActions(actionNames, 'Games');
