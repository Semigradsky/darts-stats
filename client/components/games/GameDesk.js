import React from 'react';

import { browserHistory } from 'react-router';
import Modal from 'components/popups/Modal';

import { GamesStore } from 'stores';
import { GamesActions } from 'actions';
import Loading from 'components/Loading';
import { GameRound, GameDeskCaption, GameWinners } from 'components/games';
import { logError } from 'utils/log';
import { GameStates } from 'constants/games';

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

	async finishGame() {
		await GamesActions.finish();
	},

	render() {
		const dataLoaded = this.state.dataLoaded;
		const { winnerPos, state, players = [], rounds = [], points = [] } = this.state.game;
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
					{state === GameStates.NOT_READY ? (
						<button onClick={this.finishGame}>Finish game</button>
					) : null}
					{state === GameStates.READY ? (
						<Modal>
							<GameWinners
								players={players}
								winnerPos={winnerPos}
							/>
						</Modal>
					) : null}
				</Loading>
			</div>
		);
	}

});

export default GameDesk;
