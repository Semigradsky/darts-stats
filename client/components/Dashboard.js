import React from 'react';

import LatestUsers from 'components/users/Latest';

const Dashboard = React.createClass({
	render() {
		return (
			<div>
				<LatestUsers />
				<p>Hello!</p>
			</div>
		);
	}
});

export default Dashboard;
