import React from 'react';

import Modal from 'components/popups/Modal';

import {
	AddUser,
	AllUsers,
	CreateUser,
	LatestUsersContainer
} from 'components/users';

import { ActiveGames } from 'components/games';

import './dashboard.less';

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
			<div className="dashboard">
				<ActiveGames className="dashboard--active-games" />
				<div className="dashboard--latest-users">
					<LatestUsersContainer />
					<AddUser />
				</div>
				<div className="dashboard--create-user">
					<button onClick={this.openCreateUser}>
						Create new
					</button>
					{createModal}
				</div>
				<AllUsers className="dashboard--all-users" />
			</div>
		);
	}
});

export default Dashboard;
