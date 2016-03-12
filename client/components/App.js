import React from 'react';

import PageFooter from 'components/footer/PageFooter';

const App = React.createClass({

	render() {
		return (
			<div id="content">
				<div className="container">
					{this.props.children}
				</div>
				<PageFooter />
			</div>
		);
	}

});

export default App;
