import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import RedBox from 'redbox-react';

import Dispatcher from './Dispatcher';
import routes from './routes';

const root = document.getElementById('root');

function runApp(done) {
	Dispatcher.run(done);
}

runApp(() => {
	try {
		ReactDOM.render(<Router history={hashHistory} routes={routes} />, root);
	} catch (err) {
		ReactDOM.render(<RedBox error={err} />, root);
	}
});
