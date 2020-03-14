import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveOfferID } from '../../reducers/app/selectors.js';
import ActionCreator from '../../reducers/app/action-creator.js';
import { Operation } from '../../reducers/operation.js';

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
      dispatch(ActionCreator.changeLoadingStatus(true));
      Promise.all([
          dispatch(Operation.loadNearby(id)),
          dispatch(Operation.loadComments(id))
        ])
        .then(() => {
          dispatch(ActionCreator.changeLoadingStatus(false));
        })
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithPathName);
};

export default withPathName;
