import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import { connect } from 'react-redux';
import { getNearbyList } from '../../reducers/data/selectors.js';

const OffersNearby = ({nearbyItems, nearPlacesFor, isAuth}) => {

  return <PlaceCardList items={nearbyItems} nearPlacesFor={nearPlacesFor} isAuth={isAuth} />
};

OffersNearby.propTypes = {
  nearbyItems: PropTypes.array,
  nearPlacesFor: PropTypes.string,
  isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
	nearbyItems: getNearbyList(state)
})

export default connect(mapStateToProps)(OffersNearby)
