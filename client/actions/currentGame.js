import createActions from 'utils/ActionsFabric';

export const actionNames = {
	ADD_ROUND: Symbol(),
	REMOVE_ROUND: Symbol(),
	UPDATE: Symbol()
};

export default createActions(actionNames, 'CurrentGame');
