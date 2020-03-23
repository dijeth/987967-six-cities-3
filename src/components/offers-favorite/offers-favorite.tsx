import * as React from 'react';
import PlaceCardList from '../place-card-list/place-card-list';
import {connect} from 'react-redux';
import ActionCreator from '../../reducers/app/action-creator.js';
import {PlaceCardType, AppRoute} from '../../const/const';
import {Link} from 'react-router-dom';
import { OfferMini, City } from '../../interfaces';

type Props = {
  offers: Array<OfferMini>;
  cities: Array<City>;
  isAuth: boolean;
  onCityClick: (city: City) => void;
};

const OffersFavorite = ({offers, cities, isAuth, onCityClick}) => {
  const items = cities.map((city) => {
    return (
      <li className="favorites__locations-items" key={city}>
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <Link to={AppRoute.getRoot()} className="locations__item-link" onClick={() => {
              onCityClick(city);
            }}>
              <span>{city}</span>
            </Link>
          </div>
        </div>
        <PlaceCardList items={offers[city]} isAuth={isAuth} type={PlaceCardType.FAVORITE} />
      </li>);
  });


  return <ul className="favorites__list">{items}</ul>;
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {OffersFavorite};
export default connect(null, mapDispatchToProps)(OffersFavorite);
