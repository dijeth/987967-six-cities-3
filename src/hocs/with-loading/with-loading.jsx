import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLoadingStatus} from '../../reducers/app/selectors.js';

const withLoading = (Component) => {
  const WithLoading = (props) => {
    if (props.isLoading) {
      return <h1>Loading...</h1>;
    }

    return <Component {...props} />;
  };

  WithLoading.propTypes = {
    isLoading: PropTypes.bool
  };

  const mapStateToProps = (state) => ({
    isLoading: getLoadingStatus(state)
  });

  return connect(mapStateToProps)(WithLoading);
};

export default withLoading;
