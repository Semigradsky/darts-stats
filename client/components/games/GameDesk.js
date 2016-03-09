import React from 'react';

import { GamesStore } from 'stores';
import Loading from 'components/Loading';
import { GameRound, GameDeskCaption } from 'components/games';

import './gameDesk.less';

function addRound(rounds, countPlayers) {
	const newRound = [];

	let i = countPlayers;
	while (i--) {
		newRound.push('');
	}

	return rounds.concat([newRound]);
}

const GameDesk = React.createClass({

	getInitialState() {
		return {
			dataLoaded: false,
			game: {}
		};
	},

	async componentDidMount() {
		const gameId = this.props.params.gameId;
		const data = await GamesStore.get(gameId);

		if (!data.rounds.length) {
			data.rounds = addRound([], data.players.length);
		}

		this.setState({
			dataLoaded: true,
			game: data
		});
	},

	checkGame(round, pos, value) {
		const game = this.state.game;
		game.rounds[round][pos] = value;

		this.setState({ game });
		console.log(game);
	},

	render() {
		const dataLoaded = this.state.dataLoaded;
		const { state, players = [], rounds = [] } = this.state.game;
		return (
			<div className="game-desk">
				<Loading progress={!dataLoaded}>
					<span>{state}</span>
					<GameDeskCaption players={players} />
					{rounds.map((throws, pos) =>
						<GameRound
							key={pos}
							throws={throws}
							round={pos}
							update={this.checkGame}
						/>
					)}
				</Loading>
			</div>
		);
	}

});

export default GameDesk;
