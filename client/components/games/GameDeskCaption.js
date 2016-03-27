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
		const { winnerPos, points } = this.props;
		return (
			<div className="game-players">
				{
					this.state.players.map((user, pos) => (
						<div className="game-player" key={pos}>
							{winnerPos === pos ? <div className="game-winner fa fa-trophy"></div> : null}
							{points[pos]}
							<User {...user} />
						</div>
					))
				}
			</div>
		);
	}

});

export default GameDeskCaption;
