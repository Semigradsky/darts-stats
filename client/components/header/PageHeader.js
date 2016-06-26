import React from 'react';
import cx from 'classnames';

import { IndexLink } from 'react-router';

import './header.less';

const PageHeader = ({ className }) => (
	<header className={cx(className, 'page-header')}>
		<div>
			<IndexLink to="/">Home</IndexLink>
		</div>
	</header>
);

export default PageHeader;
