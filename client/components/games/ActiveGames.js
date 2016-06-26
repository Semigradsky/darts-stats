import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import { GamesStore } from 'stores';
import Loading from 'components/Loading';
import { logError } from 'utils/log';

const ActiveGames = React.createClass({

	getInitialState() {
		return {
			dataLoaded: false,
			games: []
		};
	},

	async update() {
		try {
			const games = await GamesStore.getAll();

			this.setState({
				dataLoaded: true,
				games
			});
		} catch (err) {
			logError(err);
		}
	},

	componentWillMount() {
		this.update();
		GamesStore.addChangeListener(this.update);
	},

	componentWillUnmount() {
		GamesStore.removeChangeListener(this.update);
	},

	render() {
		const { dataLoaded, games } = this.state;
		return (
			<div className={cx(this.props.className, 'active-games')}>
				<Loading progress={!dataLoaded}>
					{games.map(game =>
						<Link to={`/game/${game.id}`} key={game.id}>{game.id} ({game.state})</Link>
					)}
				</Loading>
			</div>
		);
	}

});

export default ActiveGames;
