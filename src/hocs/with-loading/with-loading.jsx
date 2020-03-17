import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLoading} from '../../reducers/app/selectors.js';

const withLoading = (Component) => {
  const WithLoading = (props) => {
    if (props.loading !== 0) {
      return <h1>Loading...</h1>;
    }

    return <Component {...props} />;
  };

  WithLoading.propTypes = {
    loading: PropTypes.bool
  };

  const mapStateToProps = (state) => ({
    loading: getLoading(state)
  });

  return connect(mapStateToProps)(WithLoading);
};

export default withLoading;
