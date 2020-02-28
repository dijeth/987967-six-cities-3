import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard, {offerPropType} from '../place-card/place-card.jsx';
import ActionCreator from '../../action-creator.js';
import {connect} from 'react-redux';
import {ScreenType} from '../../const.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const PlaceCardList = ({offerList, isNearPlaces, onOfferHover, onListClick}) => {
  const classList = isNearPlaces ? `near-places__list places__list` : `cities__places-list places__list tabs__content`;
  const placeCardList = offerList.map((it, i) => (
    <PlaceCard
      offer={it}
      isNearPlaces={isNearPlaces}
      key={it.id}
      onHover={isNearPlaces ? null : onOfferHover}
      offsetIndex={i}
    />));

  return (
    <div
      className={classList}
      onClick={onListClick}
    >
      {placeCardList}
    </div>);
};

PlaceCardList.propTypes = {
  offerList: PropTypes.arrayOf(offerPropType).isRequired,
  isNearPlaces: PropTypes.bool.isRequired,
  onOfferHover: PropTypes.func.isRequired,
  onActiveItemChange: PropTypes.func,
  onListClick: PropTypes.func,
  activeItem: PropTypes.number
};

const mapDispatchToProps = (dispatch) => ({
  onActiveItemChange(activeItem) {
    dispatch(ActionCreator.changeActiveCard(activeItem));
    dispatch(ActionCreator.changeScreenType(ScreenType.PROPERTY));
  },

  onOfferHover(activeItem) {
    dispatch(ActionCreator.changeActiveCard(activeItem));
  }
});

export {PlaceCardList};
export default connect(null, mapDispatchToProps)(withActiveItem(PlaceCardList));
