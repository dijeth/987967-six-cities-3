import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import AppActionCreator from '../../reducers/app/action-creator.js';
import DataActionCreator from '../../reducers/data/action-creator.js';
import {Operation} from '../../reducers/data/operation.js';
import {connect} from 'react-redux';
import {offerPropType} from '../../const/props.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import Adapter from '../../adapter/adapter.js';

const PlaceCardList = ({items, nearPlacesFor, onOfferHover, onListClick, isAuth}) => {
  const isNearPlaces = nearPlacesFor !== undefined;
  const classList = isNearPlaces ? `near-places__list places__list` : `cities__places-list places__list tabs__content`;

  const placeCardList = items.map((offer, i) => {
    return (
      <PlaceCard
        offer={offer}
        isNearPlaces={isNearPlaces}
        key={offer.id}
        onHover={isNearPlaces ? null : onOfferHover}
        offsetIndex={i}
        isAuth={isAuth}
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
  isAuth: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch, props) => ({
  onActiveItemChange(activeItem) {
    dispatch(Operation.changeFavorite(activeItem.id, Adapter.postFavorite(!activeItem.isFavorite)));
    if (props.nearPlacesFor !== undefined) {
      dispatch(Operation.loadNearbyList(props.nearPlacesFor))
    }
  },

  onOfferHover(offer) {
    dispatch(AppActionCreator.changeActiveOffer(offer ? offer.id : null));
  }
});

export {PlaceCardList};
export default connect(null, mapDispatchToProps)(withActiveItem(PlaceCardList, `.place-card__bookmark-button`));
