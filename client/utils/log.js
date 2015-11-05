/* eslint-disable no-console */
const logError = console.group ? err => {
	const groupName = err.toString() + (err.name ? `: ${err.name}` : '');
	console.group(`\u{1f631} %c${groupName}`, 'color: red;');
	console.log(err.stack);
	console.groupEnd();
} : ::console.error;
/* eslint-enable no-console */

export { logError };
