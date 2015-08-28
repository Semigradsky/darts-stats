import React from 'react';

const User = React.createClass({

	render() {
		const { name } = this.props;
		return (
			<div>
				{name}
			</div>
		);
	}
});

export default User;
