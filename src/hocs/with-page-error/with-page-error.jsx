import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPageError} from '../../reducers/app/selectors.js';
import AppActionCreator from '../../reducers/app/action-creator.js';
import PageError from '../../components/page-error/page-error';

const withPageError = (Component) => {
  const WithPageError = (props) => {
    const {pageError, onClearError} = props;
    const isError = pageError !== ``;
    return (
      <React.Fragment>
        <Component {...props} />
        {isError && <PageError message={pageError} onClose={onClearError} />}
      </React.Fragment>);
  };

  WithPageError.propTypes = {
    pageError: PropTypes.string,
    onClearError: PropTypes.func
  };

  const mapStateToProps = (state) => ({
    pageError: getPageError(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    onClearError() {
      dispatch(AppActionCreator.setPageError(``));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithPageError);
};

export default withPageError;
