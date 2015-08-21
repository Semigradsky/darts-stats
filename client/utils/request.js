import superagent from 'superagent';

function getRequester(type) {
	return type === 'delete' ? superagent.del : superagent[type];
}

const handlers = {};

function request(type, url, data, fn) {
	const handlerKey = type + ' ' + url;

	if (handlerKey in handlers) {
		handlers[handlerKey].push(fn || data);
		return;
	}

	handlers[handlerKey] = [fn || data];

	const requester = getRequester(type);

	let agent = requester('http://localhost:3000/' + url);

	agent.set('X-Requested-With', 'XMLHttpRequest');
	agent.set('Expires', '-1');
	agent.set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private');

	if (typeof data === 'object') {
		agent = agent.send(data);
	}

	agent.end((err, res) => {
		handlers[handlerKey].forEach((handler) => {
			handler.call(null, err, res);
		});
		delete handlers[handlerKey];
	});
}

export default request;
