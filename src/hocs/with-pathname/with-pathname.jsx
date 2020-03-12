import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getActiveOfferID} from '../../reducers/app/selectors.js';
import ActionCreator from '../../reducers/app/action-creator.js';
import {Operation} from '../../reducers/operation.js';

const withPathName = (Component) => {
  const WithPathName = (props) => {
    if (props.pathID !== props.activeOfferID) {
      props.onActiveOfferChange(props.pathID);
      return null;
    }

    return <Component {...props} />;
  };

  WithPathName.propTypes = {
    pathID: PropTypes.string,
    activeOfferID: PropTypes.string,
    onActiveOfferChange: PropTypes.func
  };

  const mapStateToProps = (state) => ({
    activeOfferID: getActiveOfferID(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    onActiveOfferChange(id) {
      dispatch(ActionCreator.changeActiveOffer(id));
      dispatch(Operation.loadAddData(id));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithPathName);
};

export default withPathName;
