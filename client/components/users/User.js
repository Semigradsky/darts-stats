import React from 'react';

import UserActions from './Actions';

const User = React.createClass({
	removeFromLatest(event) {
		event.preventDefault();
		UserActions.update(this.props.id, { latest: false });
	},

	render() {
		return (
			<div>
				{this.props.name}
				<a href="" onClick={this.removeFromLatest} className="remove fa fa-remove"></a>
			</div>
		);
	}
});

export default User;
