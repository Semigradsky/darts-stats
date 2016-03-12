import React from 'react';

import { UsersStore } from 'stores';
import { User } from 'components/users';

const GameDeskCaption = React.createClass({

	getInitialState() {
		return {
			players: []
		};
	},

	async componentWillMount() {
		const usersIds = this.props.players;
		const players = await Promise.all(usersIds.map(id => UsersStore.get(id)));
		this.setState({ players });
	},

	render() {
		return (
			<div className="game-players">
				{
					this.state.players.map((user, pos) => (
						<div key={pos}>
							{pos}
							<User {...user} />
						</div>
					))
				}
			</div>
		);
	}

});

export default GameDeskCaption;
