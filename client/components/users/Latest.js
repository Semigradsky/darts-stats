import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

import UserStore from './Store';
import UserActions from './Actions';
import DraggableUser from 'components/users/DraggableUser';
import arrange from 'utils/arrange';
import find from 'utils/find';
import findIndex from 'utils/findIndex';

const LatestUsers = React.createClass({
	update() {
		UserStore.getLatest().then(res => {
			this.setState({ users: res.slice(), rearrangedUsers: res.slice() });
		});
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

	onMove(from) {
		const { users, rearrangedUsers } = this.state;
		const to = users[findIndex(rearrangedUsers, { id: from })].id;
		from !== to && UserActions.move(from, to);
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

	render() {
		return (
			<ul>
				{this.state.rearrangedUsers.map(user => (
					<li key={user.id}>
						<DraggableUser {...user}
							isLatest={true}
							onMove={this.onMove}
							onHover={this.onHover}
							revert={this.revert}
						/>
					</li>
				))}
			</ul>
		);
	}
});

export default DragDropContext(HTML5Backend)(LatestUsers);
