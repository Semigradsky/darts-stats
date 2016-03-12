import React from 'react';
import { IndexLink } from 'react-router';

const NotFound = React.createClass({
	render() {
		const repoUrl = 'https://github.com/Semigradsky/darts-stats';
		return (
			<div>
				<h1>Ooops... Page not found!</h1>
				<p>
					Go back to <IndexLink to="/">dashboard</IndexLink>
					&nbsp;or onward to <a href={repoUrl}>source</a>
				</p>
			</div>
		);
	}
});

export default NotFound;
