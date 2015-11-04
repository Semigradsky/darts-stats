import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute, NotFoundRoute } = Router;

import App from 'components/App';
import Dashboard from 'components/Dashboard';
import NotFound from 'components/static/NotFound';
import { GameDesk } from 'components/games';

const Routes = (
	<Route handler={App}>
		<DefaultRoute name="dashboard" handler={Dashboard}/>
		<Route name="game" path="/game/:gameId" handler={GameDesk}/>
		<NotFoundRoute handler={NotFound} />
	</Route>
);

export default Routes;
