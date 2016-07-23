import React from 'react';

const LoadingSpin = <i className="fa fa-refresh fa-spin fa-lg"></i>;

const Loading = ({ children, progress }) => {
	if (progress) {
		return LoadingSpin;
	}

	return <div>{children}</div>;
};

export default Loading;
