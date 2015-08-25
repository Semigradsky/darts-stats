function propertyMatches(item, criteria) {
	return (property) => {
		return item[property] === criteria[property];
	};
}

function findIndex(collection, criteria) {
	for (let i = 0, l = collection.length; i < l; i++) {
		if (Object.keys(criteria).every(propertyMatches(collection[i], criteria))) {
			return i;
		}
	}

	return -1;
}

export default findIndex;
