import React from 'react';

const Loading = ({ children, progress }) =>
	!progress ?
		(<div>{children}</div>) :
		(<i className="fa fa-refresh fa-spin fa-lg"></i>);

export default Loading;
