import React from 'react';
import cx from 'classnames';

import './footer.less';

const repoUrl = 'https://github.com/Semigradsky/darts-stats';

const PageFooter = ({ className }) => (
	<footer className={cx(className, 'page-footer')}>
		<div>
			<a href={repoUrl} target="_blank" className="fa fa-github"> Github</a>
			<span> | </span>
			<a href={`${repoUrl}/issues`} target="_blank" className="fa fa-warning"> Issues</a>
		</div>
	</footer>
);

export default PageFooter;
