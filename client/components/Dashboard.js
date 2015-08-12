import React from 'react';

import LatestUsers from 'components/users/Latest';
import AddUser from 'components/users/Add';

const Dashboard = React.createClass({
	render() {
		return (
			<div>
				<LatestUsers />
				<AddUser />
			</div>
		);
	}
});

export default Dashboard;
