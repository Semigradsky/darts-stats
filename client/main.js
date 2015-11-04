import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import RedBox from 'redbox-react';

import Dispatcher from './Dispatcher';
import routes from './routes';

const root = document.getElementById('root');

function runApp(done) {
	Dispatcher.run(() => {
		Router.run(routes, Router.HashLocation, done);
	});
}

runApp(Handler => {
	try {
		ReactDOM.render(<Handler/>, root);
	} catch (err) {
		ReactDOM.render(<RedBox error={err} />, root);
	}
});
