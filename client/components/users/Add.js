import React from 'react';
import { Typeahead } from 'react-typeahead';
import async from 'async';

import UserStore from './Store';
import UserActions from './Actions';
import find from 'utils/find';

const AddUser = React.createClass({
	update() {
		async.parallel([ UserStore.getAll, UserStore.getLatest ], (err, data) => {
			this.setState({ users: data[0].filter(x => !find(data[1], { id: x.id })) });
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
