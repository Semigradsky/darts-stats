export default function(...funcs) {
	return (target, key, descriptor) => {
		if (typeof descriptor.value !== 'function') {
			throw new SyntaxError();
		}

		return {
			...descriptor,
			value() {
				return descriptor.value.apply(this, arguments).then(res => {
					funcs.forEach(f => { f(); });
					return res;
				});
			}
		};
	};
}
