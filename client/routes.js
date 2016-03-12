import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/App';
import Dashboard from 'components/Dashboard';
import NotFound from 'components/static/NotFound';
import { GameDesk } from 'components/games';

const Routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard} />
		<Route path="/game/:gameId" component={GameDesk} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default Routes;
