import React from 'react';

import UserActions from './Actions';

const User = React.createClass({
	removeFromLatest(event) {
		event.preventDefault();
		UserActions.doNotLatest(this.props.id);
	},

	render() {
		const { name, isLatest } = this.props;
		return (
			<div>
				{name}
				{isLatest ? <a href="" onClick={this.removeFromLatest} className="remove fa fa-remove"></a> : null}
			</div>
		);
	}
});

export default User;
