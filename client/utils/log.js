/* eslint-disable no-console */
const logError = console.group ? err => {
	const groupName = err.toString() + (err.name ? `: ${err.name}` : '');
	console.group(groupName);
	console.log(err.stack);
	console.groupEnd(groupName);
} : ::console.error;
/* eslint-enable no-console */

export { logError };
