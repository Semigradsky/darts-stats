import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import Router from 'react-router';
import RedBox from 'redbox-react';

import routes from './routes';

const root = document.getElementById('root');

Router.run(routes, Router.HashLocation, (Handler) => {
	try {
		React.render(<Handler/>, root);
	} catch (err) {
		React.render(<RedBox error={err} />, root);
	}
});
