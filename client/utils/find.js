import findIndex from 'utils/findIndex';

function find(collection, criteria) {
	const index = findIndex(collection, criteria);
	return index >= 0 ? collection[index] : undefined;
}

export default find;
