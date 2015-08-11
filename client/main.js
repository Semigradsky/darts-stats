import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute, NotFoundRoute } = Router;

import App from 'components/App';
import Dashboard from 'components/Dashboard';
import NotFound from 'components/static/NotFound';

const content = document.getElementsByTagName('body')[0];

const Routes = (
	<Route handler={App}>
		<DefaultRoute name="dashboard" handler={Dashboard}/>
		<NotFoundRoute handler={NotFound} />
	</Route>
);

Router.run(Routes, Router.HashLocation, (Handler) => {
	React.render(<Handler/>, content);
});
