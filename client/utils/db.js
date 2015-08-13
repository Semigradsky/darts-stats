const db = {
	get users() {
		return JSON.parse(localStorage.getItem('users')) || [];
	},

	set users(value) {
		localStorage.setItem('users', JSON.stringify(value));
	}
};

export default db;
