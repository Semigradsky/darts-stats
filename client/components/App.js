import React from 'react';
import { RouteHandler } from 'react-router';

import PageFooter from 'components/footer/PageFooter';

const App = React.createClass({

	render() {
		return (
			<div id="content">
				<div className="container">
					<RouteHandler />
				</div>
				<PageFooter />
			</div>
		);
	}

});

export default App;
