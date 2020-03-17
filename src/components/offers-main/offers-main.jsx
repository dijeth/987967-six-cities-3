import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {connect} from 'react-redux';
import {getSortedOffers} from '../../reducers/data/selectors.js';
import {PlaceCardType} from '../../const/const.js';

const OffersMain = ({offers, isAuth}) => {
  return <PlaceCardList items={offers} isAuth={isAuth} type={PlaceCardType.DEFAULT} />;
};

OffersMain.propTypes = {
  offers: PropTypes.array,
  isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
  offers: getSortedOffers(state)
});

export default connect(mapStateToProps)(OffersMain);
