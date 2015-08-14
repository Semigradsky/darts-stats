import React from 'react';

import './footer.less';

const PageFooter = React.createClass({
	render() {
		const repoUrl = 'https://github.com/Semigradsky/darts-stats';
		return (
			<footer className="page-footer">
				<div>
					<a href={repoUrl} target="_blank" className="fa fa-github"> Github</a>
					<span> | </span>
					<a href={repoUrl + '/issues'} target="_blank" className="fa fa-warning"> Issues</a>
				</div>
			</footer>
		);
	}
});

export default PageFooter;
