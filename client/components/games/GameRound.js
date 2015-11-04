import React from 'react';

import { PlayerThrows } from 'components/games';

const GameRound = React.createClass({

	render() {
		return (
			<div>
				{
					this.props.throws.map((playerThrows, pos) => (
						<PlayerThrows key={pos} throws={playerThrows} />
					))
				}
			</div>
		);
	}

});

export default GameRound;
