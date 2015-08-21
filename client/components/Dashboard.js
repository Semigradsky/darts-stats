import React from 'react';

import Modal from 'components/popups/Modal';
import LatestUsers from 'components/users/Latest';
import AddUser from 'components/users/Add';
import CreateUser from 'components/users/Create';
import AllUsers from 'components/users/All';

const Dashboard = React.createClass({
	getInitialState() {
		return { createModalOpen: false };
	},

	onClose() {
		this.setState({ createModalOpen: false });
	},

	openCreateUser() {
		this.setState({ createModalOpen: true });
	},

	render() {
		const createModal = this.state.createModalOpen ? (
			<Modal onClose={this.onClose}>
				<CreateUser />
			</Modal>
		) : '';

		return (
			<div>
				<LatestUsers />
				<AddUser />
				<button onClick={this.openCreateUser}>
					Create new
				</button>
				{createModal}
				<AllUsers />
			</div>
		);
	}
});

export default Dashboard;
