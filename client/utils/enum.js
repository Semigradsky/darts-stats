function enumCreator(keys, prefix) {
	const res = {};

	keys.forEach(key => {
		res[prefix ? `${prefix}_${key}` : key] = Symbol();
	});

	return res;
}

export default enumCreator;
