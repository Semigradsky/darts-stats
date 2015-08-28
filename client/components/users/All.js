import React from 'react';

import UserStore from 'components/users/Store';
import UserActions from 'components/users/Actions';
import User from 'components/users/User';
import { logError } from 'utils/log';

const sortByScore = (x, y) => {
	return x.score - y.score;
};

const AllUsers = React.createClass({
	update() {
		UserStore.getAll().then(data => {
			this.setState({ users: data });
		}, logError);
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

	removeUser(id, event) {
		event && event.preventDefault();
		UserActions.remove(id);
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
