import React from 'react';

import { GamesStore } from 'stores';
import Loading from 'components/Loading';
import { GameRound, GameDeskCaption } from 'components/games';

const GameDesk = React.createClass({

	getInitialState() {
		return {
			dataLoaded: false,
			game: {},
			lastRound: []
		};
	},

	async componentDidMount() {
		const gameId = this.props.params.gameId;
		const data = await GamesStore.get(gameId);
		this.setState({
			dataLoaded: true,
			game: data,
			lastRound: new Array(data.players.length).fill([])
		});
	},

	render() {
		const { state, players = [], rounds = [] } = this.state.game;
		return (
			<div>
				<Loading progress={!this.state.dataLoaded}>
					<span>{state}</span>
					<GameDeskCaption players={players} />
					{rounds.map(throws => <GameRound throws={throws} />)}
					<GameRound throws={this.state.lastRound} />
				</Loading>
			</div>
		);
	}

});

export default GameDesk;
