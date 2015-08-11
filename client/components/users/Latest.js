import React from 'react';

import UserStore from './Store';

const LatestUsers = React.createClass({
	update() {
		UserStore.getLatest((err, data) => {
			this.setState({ users: data });
		});
	},

	getInitialState() {
		return { users: [] };
	},

	componentDidMount() {
		this.update();
		UserStore.addChangeListener(this.update);
	},

	componentWillUnmount() {
		UserStore.removeChangeListener(this.update);
	},

	render() {
		return (
			<ul>
				{this.state.users.map(user => <li key={user.id}>{user.name}</li>)}
			</ul>
		);
	}
});

export default LatestUsers;
