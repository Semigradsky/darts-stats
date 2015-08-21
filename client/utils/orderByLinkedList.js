import find from 'utils/find.js';

function orderByLinkedList(data, list) {
	let current = find(list, { from: null });
	const res = [];

	while (current) {
		res.push(find(data, { id: current.id }));
		current = find(list, { id: current.to });
	}

	return res;
}

export default orderByLinkedList;
