import React from 'react';

import UserStore from 'components/users/Store';
import UserActions from 'components/users/Actions';
import User from 'components/users/User';
import { logError } from 'utils/log';

const sortByScore = (x, y) => {
	return x.score - y.score;
};

const AllUsers = React.createClass({
	async update() {
		try {
			const data = await UserStore.getAll();
			this.setState({ users: data });
		} catch(err) {
			logError(err);
		}
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

	async removeUser(id, event) {
		event && event.preventDefault();
		try {
			await UserActions.remove(id);
		} catch(err) {
			logError(err);
		}
	},

	render() {
		return (
			<ul>
				{this.state.users.sort(sortByScore).map(user => (
					<li key={user.id}>
						<User {...user} />
						<a href="" style={{color: 'red'}} onClick={this.removeUser.bind(this, user.id)} className="remove fa fa-trash">Remove</a>
					</li>
				))}
			</ul>
		);
	}
});

export default AllUsers;
