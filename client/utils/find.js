function propertyMatches(item, criteria) {
	return (property) => {
		return item[property] === criteria[property];
	};
}

function find(collection, criteria) {
	for (let i = 0, l = collection.length; i < l; i++) {
		if (Object.keys(criteria).every(propertyMatches(collection[i], criteria))) {
			return collection[i];
		}
	}

	return undefined;
}

export default find;
