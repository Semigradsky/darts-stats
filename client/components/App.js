import React from 'react';
import { IndexLink } from 'react-router';

import PageFooter from 'components/footer/PageFooter';

const App = React.createClass({

	render() {
		return (
			<div id="content">
				<IndexLink to="/">Home</IndexLink>
				<div className="container">
					{this.props.children}
				</div>
				<PageFooter />
			</div>
		);
	}

});

export default App;
