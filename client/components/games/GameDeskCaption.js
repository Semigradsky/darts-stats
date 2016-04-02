import React from 'react';

import { User } from 'components/users';

const GameDeskCaption = ({ winnerPos, points, players }) => (
	<div className="game-players">
		{
			players.map((user, pos) => (
				<div className="game-player" key={pos}>
					{winnerPos === pos ? <div className="game-winner fa fa-trophy"></div> : null}
					{points[pos]}
					<User {...user} />
				</div>
			))
		}
	</div>
);

export default GameDeskCaption;
