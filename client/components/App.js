import React from 'react';
import { RouteHandler } from 'react-router';

import PageFooter from 'components/footer/PageFooter';

const App = React.createClass({

	render() {
		localStorage.setItem('users', '[{"id":1,"name":"Abbey Rau"},{"id":2,"name":"Carter Brekke"},{"id":3,"name":"Caterina Hagenes","latest":true},{"id":4,"name":"Delia Murphy"},{"id":5,"name":"Sigurd Predovic","latest":true}]');

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
