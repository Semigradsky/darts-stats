import config from 'config';

function status(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	}
	return Promise.reject(new Error(response.statusText));
}

const cache = {};

async function request(type, url, data) {
	const handlerKey = `${type} ${url}`;

	const clearCache = () => {
		delete cache[handlerKey];
	};

	if (type !== 'post' && handlerKey in cache) {
		return await cache[handlerKey];
	}

	cache[handlerKey] = fetch(config.api + url, {
		method: type,
		body: data ? JSON.stringify(data) : undefined,
		cache: 'no-cache',
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
	})
		.then(status).then(res => res.json())
		.then(res => { clearCache(); return res; }, err => { clearCache(); throw err; });

	return await cache[handlerKey];
}

export default request;
