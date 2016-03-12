import React from 'react';

import { CurrentGameStore } from 'stores';
import Loading from 'components/Loading';
import { GameRound, GameDeskCaption } from 'components/games';
import { logError } from 'utils/log';

import './gameDesk.less';

const GameDesk = React.createClass({

	getInitialState() {
		return {
			dataLoaded: false,
			game: {}
		};
	},

	async update() {
		try {
			const gameId = this.props.params.gameId;
			const data = await CurrentGameStore.get(gameId);

			this.setState({
				dataLoaded: true,
				game: data
			});
		} catch (err) {
			logError(err);
		}
	},

	componentWillMount() {
		this.update();
		CurrentGameStore.addChangeListener(this.update);
	},

	componentWillUnmount() {
		CurrentGameStore.removeChangeListener(this.update);
	},

	render() {
		const dataLoaded = this.state.dataLoaded;
		const { state, players = [], rounds = [] } = this.state.game;
		return (
			<div className="game-desk">
				<Loading progress={!dataLoaded}>
					<span>{state}</span>
					<GameDeskCaption players={players} />
					{rounds.map((round, pos) =>
						<GameRound
							key={pos}
							round={round}
							roundPos={pos}
						/>
					)}
				</Loading>
			</div>
		);
	}

});

export default GameDesk;
