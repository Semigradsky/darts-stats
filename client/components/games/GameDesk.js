import React from 'react';

import { browserHistory } from 'react-router';

import { GamesStore } from 'stores';
import { GamesActions } from 'actions';
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
			const data = await GamesStore.get(gameId);

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
		GamesStore.addChangeListener(this.update);
		this.unlistenHistory = browserHistory.listenBefore(async (location, done) => {
			await GamesActions.save();
			done();
		});
	},

	componentWillUnmount() {
		GamesStore.removeChangeListener(this.update);
		this.unlistenHistory();
	},

	render() {
		const dataLoaded = this.state.dataLoaded;
		const { winnerPos, players = [], rounds = [], points = [] } = this.state.game;
		return (
			<div className="game-desk">
				<Loading progress={!dataLoaded}>
					<GameDeskCaption
						winnerPos={winnerPos}
						players={players}
						points={points}
					/>
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
