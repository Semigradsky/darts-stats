import React from 'react';

import Modal from 'components/popups/Modal';

import {
	AddUser,
	AllUsers,
	CreateUser,
	LatestUsersContainer
} from 'components/users';

import { ActiveGames } from 'components/games';

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
				<ActiveGames />
				<LatestUsersContainer />
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
