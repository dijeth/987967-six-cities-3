import * as React from 'react';
import PlaceCard from '../place-card/place-card';
import AppActionCreator from '../../reducers/app/action-creator.js';
import {Operation} from '../../reducers/data/operation.js';
import {connect} from 'react-redux';
import {PlaceCardType} from '../../const/const';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import Adapter from '../../adapter/adapter.js';
import {OfferMini, List} from '../../interfaces';

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

type Props = List<OfferMini> & {
  type: PlaceCardType;
  isAuth: boolean;
  onOfferHover: (offer: OfferMini | null) => void;
  nearPlacesFor?: string;
}

const PlaceCardList: React.FC<Props> = ({items, onOfferHover, onListClick, isAuth, type}) => {
  const classList = getClassList(type);

  const placeCardList = items.map((offer) => {
    return (
      <PlaceCard
        offer={offer}
        key={offer.id}
        onHover={type === PlaceCardType.DEFAULT ? onOfferHover : null}
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
