import React from 'react';
import PropTypes, { string } from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {connect} from 'react-redux';
import ActionCreator from '../../reducers/app/action-creator.js';
import {PlaceCardType, AppRoute} from '../../const/const.js';
import {Link} from 'react-router-dom';

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

OffersFavorite.propTypes = {
  offers: PropTypes.object,
  cities: PropTypes.arrayOf(string),
  isAuth: PropTypes.bool,
  onCityClick: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {OffersFavorite};
export default connect(null, mapDispatchToProps)(OffersFavorite);
