import React from 'react';

import { DraggableUser } from 'components/users';

const LatestUsers = ({ users, onMove, onHover, revert, removeFromLatest }) => (
	<ul className="latest-users">
		{users.map(user => (
			<li key={user.id} className="latest-user">
				<DraggableUser
					{...user}
					isLatest={true}
					onMove={onMove}
					onHover={onHover}
					revert={revert}
				/>
				<a
					href="#"
					className="remove fa fa-remove"
					onClick={removeFromLatest.bind(null, user.id)}
				/>
			</li>
		))}
	</ul>
);

export default LatestUsers;
