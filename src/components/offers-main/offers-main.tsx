import * as React from 'react';
import PlaceCardList from '../place-card-list/place-card-list';
import {connect} from 'react-redux';
import {getSortedOffers} from '../../reducers/data/reselectors.js';
import {PlaceCardType} from '../../const/const';
import { OfferMini } from '../../interfaces';

type Props = {
  offers: Array<OfferMini>;
  isAuth: boolean;
}

const OffersMain: React.FC<Props> = ({offers, isAuth}) => {
  return <PlaceCardList items={offers} isAuth={isAuth} type={PlaceCardType.DEFAULT} />;
};

const mapStateToProps = (state) => ({
  offers: getSortedOffers(state)
});

export {OffersMain};
export default connect(mapStateToProps)(OffersMain);
