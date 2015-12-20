import React from 'react';
import { Typeahead } from 'react-typeahead';

import { UsersStore } from 'stores';
import { UsersActions } from 'actions';
import { find } from 'utils/collection';
import { logError } from 'utils/log';

const AddUser = React.createClass({
	async update() {
		try {
			const [users, latestUsers] = await Promise.all([UsersStore.getAll(), UsersStore.getLatest()]);
			this.setState({ users: users.filter(x => !find(latestUsers, { id: x.id })) });
		} catch (err) {
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

	async onSelect(user) {
		try {
			await UsersActions.doLatest(user.id);
		} catch (err) {
			logError(err);
		}
		this.refs.typeahead.setEntryText('');
	},

	render() {
		return (
			<div>
				<Typeahead
					ref="typeahead"
					options={this.state.users}
					maxVisible={5}
					filterOption="name"
					displayOption="name"
					onOptionSelected={this.onSelect}
				/>
			</div>
		);
	}
});

export default AddUser;
