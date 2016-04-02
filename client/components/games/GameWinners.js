import React from 'react';

import { User } from 'components/users';
import { GamesActions } from 'actions';

import './gameWinners.less';

const GameWinners = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},

	componentDidMount() {
		window.setTimeout(() => {
			this.refs.players.setAttribute('data-winner', this.props.winnerPos + 1);
		}, 500);
	},

	async finishGame() {
		await GamesActions.finish();
		this.context.router.push('/');
	},

	async continueGame() {
		await GamesActions.continue();
	},

	render() {
		const { players, winnerPos } = this.props;
		return (
			<div>
				<div ref="players" className="winner-container">
					{players.map((user, pos) => (
						<div className="winner-player" key={user.id}>
							<User {...user} />
							{winnerPos === pos ? <div className="game-winner fa fa-trophy"></div> : null}
						</div>
					))}
				</div>
				<div className="winner-buttons">
					<button type="button" onClick={this.continueGame}>Continue</button>
					<button type="submit" onClick={this.finishGame}>Finish game</button>
				</div>
			</div>
		);
	}
});

export default GameWinners;
