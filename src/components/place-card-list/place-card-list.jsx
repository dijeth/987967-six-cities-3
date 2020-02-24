import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard, { offerPropType } from '../place-card/place-card.jsx';

const PlaceCardList = ({ offerList, isNearPlaces }) => {
  const classList = isNearPlaces ? `near-places__list places__list` : `cities__places-list places__list tabs__content`;

  return (
    <div className={classList}>
        {offerList.map((it) => <PlaceCard offer={it} isNearPlaces={isNearPlaces} key={it.id} />)}
    </div>);
}

PlaceCardList.propTypes = {
  offerList: PropTypes.arrayOf(offerPropType).isRequired,
  isNearPlaces: PropTypes.bool.isRequired
};

export default PlaceCardList;
