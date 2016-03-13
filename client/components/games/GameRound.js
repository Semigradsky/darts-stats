import React from 'react';

import { PlayerThrows } from 'components/games';
import { GamesActions } from 'actions';
import { logError } from 'utils/log';

const GameRound = React.createClass({

	async checkRound(pos, value) {
		try {
			await GamesActions.updateThrows(this.props.roundPos, pos, value);
		} catch (err) {
			logError(err);
		}
	},

	render() {
		return (
			<div className="game-round">
				{
					this.props.round.map((playerThrows, pos) => (
						<PlayerThrows
							key={pos + playerThrows.throws}
							throws={playerThrows.throws}
							value={playerThrows.value}
							update={this.checkRound.bind(null, pos)}
						/>
					))
				}
			</div>
		);
	}

});

export default GameRound;
