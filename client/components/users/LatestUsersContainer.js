import React from 'react';
import { Navigation } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import UserStore from 'components/users/Store';
import GameStore from 'components/games/Store';
import UserActions from 'components/users/Actions';
import GameActions from 'components/games/Actions';
import { LatestUsers } from 'components/users';
import { arrange, find, findIndex } from 'utils/collection';
import { logError } from 'utils/log';

import './latest.less';

const LatestUsersContainer = React.createClass({
	mixins: [ Navigation ],

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

	async startGame() {
		try {
			const { id } = await GameActions.create(this.state.users.map(x => x.id));
			this.transitionTo('game', id);
		} catch (err) {
			logError(err);
		}
	},

	render() {
		return (
			<div>
				<LatestUsers
					users={this.state.rearrangedUsers}
					onMove={this.onMove}
					onHover={this.onHover}
					revert = {this.revert}
					removeFromLatest = {this.removeFromLatest}
				/>
				{
					this.state.users.length >= 2 ?
						<button onClick={this.startGame}>Start Game!</button> :
						null
				}
			</div>
		);
	}
});

export default DragDropContext(HTML5Backend)(LatestUsersContainer);