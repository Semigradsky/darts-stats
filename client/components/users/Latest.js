import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import async from 'async';

import UserStore from './Store';
import UserActions from './Actions';
import DraggableUser from 'components/users/DraggableUser';
import orderByLinkedList from 'utils/orderByLinkedList';

const LatestUsers = React.createClass({
	update() {
		async.parallel([UserStore.getLatest, UserStore.getPositions], (err, res) => {
			this.setState({ users: orderByLinkedList.apply(null, res) });
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

	onMove(from, to) {
		from !== to && UserActions.move(from, to);
	},

	revert() {
		console.log('revert');
	},

	render() {
		const { users } = this.state;
		return (
			<ul>
				{users.map(user => (
					<li key={user.id}>
						<DraggableUser {...user} onMove={this.onMove} revert={this.revert} />
					</li>
				))}
			</ul>
		);
	}
});

export default DragDropContext(HTML5Backend)(LatestUsers);
