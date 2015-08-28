import enum from 'utils/enum';

const constants = enum([
	'CREATE',
	'REMOVE',
	'UPDATE',
	'MOVE',
	'DO_LATEST',
	'DO_NOT_LATEST'
], 'USER');

export default constants;
