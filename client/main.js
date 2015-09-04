import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import Router from 'react-router';

import routes from './routes';

const content = document.getElementsByTagName('body')[0];

Router.run(routes, Router.HashLocation, (Handler) => {
	React.render(<Handler/>, content);
});
