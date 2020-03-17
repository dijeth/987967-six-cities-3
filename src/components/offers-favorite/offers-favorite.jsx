import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {connect} from 'react-redux';
import {getFavorites} from '../../reducers/data/selectors.js';
import {PlaceCardType} from '../../const/const.js';

const OffersFavorite = ({favoriteItems, isAuth}) => {
  return <PlaceCardList items={favoriteItems} isAuth={isAuth} type={PlaceCardType.FAVORITE} />;
};

OffersFavorite.propTypes = {
  favoriteItems: PropTypes.array,
  isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
  favoriteItems: getFavorites(state)
});

export default connect(mapStateToProps)(OffersFavorite);
