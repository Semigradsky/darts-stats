import React from 'react';
import { Typeahead } from 'react-typeahead';

import UserStore from './Store';
import UserActions from './Actions';

const AddUser = React.createClass({
	update() {
		UserStore.getAll((err, data) => {
			this.setState({ users: data.filter(x => !x.latest) });
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

	onSelect(user) {
		UserActions.doLatest(user.id);
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
