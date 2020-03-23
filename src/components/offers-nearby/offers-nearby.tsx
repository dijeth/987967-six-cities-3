import * as React from 'react';
import PlaceCardList from '../place-card-list/place-card-list';
import {connect} from 'react-redux';
import {getNearbyList} from '../../reducers/data/selectors.js';
import {PlaceCardType} from '../../const/const';
import { OfferMini } from '../../interfaces';

type Props = {
  nearbyItems: OfferMini;
  nearPlacesFor: string;
  isAuth: boolean;
}

const OffersNearby: React.FC<Props> = ({nearbyItems, nearPlacesFor, isAuth}) => {
  return <PlaceCardList items={nearbyItems} nearPlacesFor={nearPlacesFor} isAuth={isAuth} type={PlaceCardType.NEARBY} />;
};

const mapStateToProps = (state) => ({
  nearbyItems: getNearbyList(state)
});

export {OffersNearby};
export default connect(mapStateToProps)(OffersNearby);
