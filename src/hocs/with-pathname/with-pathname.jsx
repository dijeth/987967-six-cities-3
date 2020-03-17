import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ActionCreator from '../../reducers/app/action-creator.js';
import {Operation} from '../../reducers/data/operation.js';

const withPathName = (Component) => {
  const WithPathName = (props) => {
    props.onActiveOfferChange(props.pathID);
    return <Component {...props} />;
  };

  WithPathName.propTypes = {
    pathID: PropTypes.string,
    onActiveOfferChange: PropTypes.func
  };

  const mapDispatchToProps = (dispatch) => ({
    onActiveOfferChange(id) {
      dispatch(ActionCreator.changeActiveOffer(id));
      dispatch(Operation.loadProperties(id));
    }
  });

  return connect(null, mapDispatchToProps)(WithPathName);
};

export default withPathName;
