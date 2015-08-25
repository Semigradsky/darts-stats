function arrange(collection, from, to) {
	const fromIndex = collection.indexOf(from);
	const toIndex = collection.indexOf(to);
	collection.splice(fromIndex, 1);
	collection.splice(toIndex, 0, from);
}

export default arrange;
