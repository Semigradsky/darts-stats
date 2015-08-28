import React from 'react';
import { Typeahead } from 'react-typeahead';

import UserStore from 'components/users/Store';
import UserActions from 'components/users/Actions';
import find from 'utils/find';
import { logError } from 'utils/log';

const AddUser = React.createClass({
	async update() {
		try {
			const [ users, latestUsers ] = await Promise.all([ UserStore.getAll(), UserStore.getLatest() ]);
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
		UserStore.addChangeListener(this.update);
	},

	componentWillUnmount() {
		UserStore.removeChangeListener(this.update);
	},

	async onSelect(user) {
		try {
			await UserActions.doLatest(user.id);
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
