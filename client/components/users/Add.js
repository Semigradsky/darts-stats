import React from 'react';
import { Typeahead } from 'react-typeahead';

import UserStore from 'components/users/Store';
import UserActions from 'components/users/Actions';
import find from 'utils/find';
import { logError } from 'utils/log';

const AddUser = React.createClass({
	update() {
		Promise.all([ UserStore.getAll(), UserStore.getLatest() ]).then(data => {
			this.setState({ users: data[0].filter(x => !find(data[1], { id: x.id })) });
		}, logError);
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
		UserActions.doLatest(user.id).then(null, logError);
		this.refs.typeahead.setEntryText('');
	},

	render() {
		return (
			<div>

			</div>
		);
	}
});

export default AddUser;
