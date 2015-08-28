import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

import UserStore from 'components/users/Store';
import UserActions from 'components/users/Actions';
import DraggableUser from 'components/users/DraggableUser';
import arrange from 'utils/arrange';
import find from 'utils/find';
import findIndex from 'utils/findIndex';
import { logError } from 'utils/log';

import './latest.less';

const LatestUsers = React.createClass({
	async update() {
		try {
			const users = await UserStore.getLatest();
			this.setState({ users: users.slice(), rearrangedUsers: users.slice() });
		} catch (err) {
			logError(err);
		}
	},

	getInitialState() {
		return { users: [], rearrangedUsers: [] };
	},

	componentDidMount() {
		this.update();
		UserStore.addChangeListener(this.update);
	},

	componentWillUnmount() {
		UserStore.removeChangeListener(this.update);
	},

	async onMove(from) {
		const { users, rearrangedUsers } = this.state;
		const to = users[findIndex(rearrangedUsers, { id: from })].id;
		if (from !== to) {
			return;
		}

		try {
			await UserActions.move(from, to);
		} catch (err) {
			logError(err);
		}
	},

	onHover(from, to) {
		if (from !== to) {
			const { rearrangedUsers } = this.state;
			arrange(rearrangedUsers, find(rearrangedUsers, { id: from }), find(rearrangedUsers, { id: to }));
			this.setState({ rearrangedUsers });
		}
	},

	revert() {
		this.setState({ rearrangedUsers: this.state.users.slice() });
	},

	async removeFromLatest(id, event) {
		event.preventDefault();
		try {
			await UserActions.doNotLatest(id);
		} catch (err) {
			logError(err);
		}
	},

	render() {
		return (
			<ul className="latest-users">
				{this.state.rearrangedUsers.map(user => (
					<li key={user.id} className="latest-user">
						<DraggableUser {...user}
							isLatest={true}
							onMove={this.onMove}
							onHover={this.onHover}
							revert={this.revert}
						/>
						<a href="#" onClick={this.removeFromLatest.bind(null, user.id)} className="remove fa fa-remove"></a>
					</li>
				))}
			</ul>
		);
	}
});

export default DragDropContext(HTML5Backend)(LatestUsers);
