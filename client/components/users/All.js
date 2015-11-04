import React from 'react';

import { UsersStore } from 'stores';
import { UsersActions } from 'actions';
import { User } from 'components/users';
import { logError } from 'utils/log';

const sortByScore = (x, y) => {
	return x.score - y.score;
};

const AllUsers = React.createClass({
	async update() {
		try {
			const data = await UsersStore.getAll();
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
		UsersStore.addChangeListener(this.update);
	},

	componentWillUnmount() {
		UsersStore.removeChangeListener(this.update);
	},

	async removeUser(id, event) {
		event && event.preventDefault();
		try {
			await UsersActions.remove(id);
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
