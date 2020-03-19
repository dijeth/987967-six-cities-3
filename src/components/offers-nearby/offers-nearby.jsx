import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {connect} from 'react-redux';
import {getNearbyList} from '../../reducers/data/selectors.js';
import {PlaceCardType} from '../../const/const.js';

const OffersNearby = ({nearbyItems, nearPlacesFor, isAuth}) => {
  return <PlaceCardList items={nearbyItems} nearPlacesFor={nearPlacesFor} isAuth={isAuth} type={PlaceCardType.NEARBY} />;
};

OffersNearby.propTypes = {
  nearbyItems: PropTypes.array,
  nearPlacesFor: PropTypes.string,
  isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
  nearbyItems: getNearbyList(state)
});

export {OffersNearby};
export default connect(mapStateToProps)(OffersNearby);
