import 'normalize.css';
import 'font-awesome/css/font-awesome.css';
import './common.less';
import './app.less';

import React from 'react';

import PageHeader from 'components/header/PageHeader';
import PageFooter from 'components/footer/PageFooter';

const App = ({ children }) => (
	<div className="app-container">
		<PageHeader className="app-header" />
		<div className="app-content">
			{children}
		</div>
		<PageFooter className="app-footer" />
	</div>
);

export default App;
