import React from 'react';

import { PlayerThrows } from 'components/games';

const GameRound = React.createClass({

	render() {
		return (
			<div className="game-round">
				{
					this.props.throws.map((playerThrows, pos) => (
						<PlayerThrows key={pos+playerThrows} throws={playerThrows} update={this.props.update.bind(null, this.props.round, pos)} />
					))
				}
			</div>
		);
	}

});

export default GameRound;
