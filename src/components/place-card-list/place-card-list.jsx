import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import AppActionCreator from '../../reducers/app/action-creator.js';
import {Operation} from '../../reducers/data/operation.js';
import {connect} from 'react-redux';
import {offerPropType} from '../../const/props.js';
import {PlaceCardType} from '../../const/const';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import Adapter from '../../adapter/adapter.js';

const getClassList = (type) => {
  switch (type) {
    case PlaceCardType.FAVORITE:
      return `favorites__places`;

    case PlaceCardType.NEARBY:
      return `near-places__list places__list`;

    default:
    case PlaceCardType.DEFAULT:
      return `cities__places-list tabs__content places__list`;
  }
};

const PlaceCardList = ({items, onOfferHover, onListClick, isAuth, type}) => {
  const classList = getClassList(type);

  const placeCardList = items.map((offer, i) => {
    return (
      <PlaceCard
        offer={offer}
        key={offer.id}
        onHover={type === PlaceCardType.DEFAULT ? onOfferHover : null}
        offsetIndex={i}
        isAuth={isAuth}
        type={type}
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
  nearPlacesFor: PropTypes.string,
  onOfferHover: PropTypes.func.isRequired,
  onActiveItemChange: PropTypes.func,
  onListClick: PropTypes.func,
  activeItem: offerPropType,
  isAuth: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(Array.from(Object.values(PlaceCardType))).isRequired
};

const mapDispatchToProps = (dispatch, props) => ({
  onActiveItemChange(activeItem) {
    dispatch(Operation.changeFavorite(activeItem.id, Adapter.postFavorite(!activeItem.isFavorite)));
    if (props.nearPlacesFor !== undefined) {
      dispatch(Operation.loadNearbyList(props.nearPlacesFor));
    }
  },

  onOfferHover(offer) {
    dispatch(AppActionCreator.changeActiveOffer(offer ? offer.id : null));
  }
});

export {PlaceCardList};
export default connect(null, mapDispatchToProps)(withActiveItem(PlaceCardList, `.place-card__bookmark-button`));
