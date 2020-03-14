import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import ActionCreator from '../../reducers/app/action-creator.js';
import {Operation} from '../../reducers/operation.js';
import {connect} from 'react-redux';
import {offerPropType} from '../../const/props.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {handleActiveOfferChange} from '../../hocs/with-pathname/with-pathname.jsx';

const PlaceCardList = ({items, isNearPlaces, onOfferHover, onListClick}) => {
  const classList = isNearPlaces ? `near-places__list places__list` : `cities__places-list places__list tabs__content`;

  const placeCardList = items.map((offer, i) => {
    return (
      <PlaceCard
        offer={offer}
        isNearPlaces={isNearPlaces}
        key={offer.id}
        onHover={isNearPlaces ? null : onOfferHover}
        offsetIndex={i}
      />);
  });

  return (
    <div
      className={classList}
      onClick={onListClick}
    >
      {placeCardList}
    </div>);
};

PlaceCardList.propTypes = {
  items: PropTypes.arrayOf(offerPropType).isRequired,
  isNearPlaces: PropTypes.bool.isRequired,
  onOfferHover: PropTypes.func.isRequired,
  onActiveItemChange: PropTypes.func,
  onListClick: PropTypes.func,
  activeItem: offerPropType
};

const mapDispatchToProps = (dispatch) => ({
  onActiveItemChange(activeItem) {
    handleActiveOfferChange(dispatch, activeItem.id)
  },

  onOfferHover(offer) {
    dispatch(ActionCreator.changeActiveOffer(offer ? offer.id : null));
  }
});

export {PlaceCardList};
export default connect(null, mapDispatchToProps)(withActiveItem(PlaceCardList, `.place-card__name`));
