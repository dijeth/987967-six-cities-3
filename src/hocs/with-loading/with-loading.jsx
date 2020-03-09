import React from 'react';
import {connect} from 'react-redux';
import {getLoadingStatus} from '../../reducers/app/selectors.js';

const withLoading = (Component) => {
	const WithLoading = (props) => {
console.log(props.isLoading)		
		if (props.isLoading) {
			return <h1>Loading...</h1>
		};

		return <Component {...props} />
	};

	const mapStateToProps = (state) => ({
		isLoading: getLoadingStatus(state)
	});

	return connect(mapStateToProps)(WithLoading);
};

export default withLoading;