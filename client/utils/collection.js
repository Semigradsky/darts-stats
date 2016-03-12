function propertyMatches(item, criteria) {
	return (property) => item[property] === criteria[property];
}

export function findIndex(collection, criteria) {
	for (let i = 0, l = collection.length; i < l; i++) {
		if (Object.keys(criteria).every(propertyMatches(collection[i], criteria))) {
			return i;
		}
	}

	return -1;
}

export function find(collection, criteria) {
	const index = findIndex(collection, criteria);
	return index >= 0 ? collection[index] : undefined;
}

export function arrange(collection, from, to) {
	const fromIndex = collection.indexOf(from);
	const toIndex = collection.indexOf(to);
	collection.splice(fromIndex, 1);
	collection.splice(toIndex, 0, from);
}

export default {
	arrange,
	findIndex,
	find
};
