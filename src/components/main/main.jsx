import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {CityCoord} from '../../const.js';
import OffersMap from '../offers-map/offers-map.jsx';
import CityList from '../city-list/city-list.jsx';
import SortList from '../sort-list/sort-list.jsx';
import withOpenState from '../../hocs/with-open-state/with-open-state.jsx';

const SortListWithOpenState = withOpenState(SortList);

const Main = ({offers, cities, activeCity, activeOffer, isNearPlaces, sortType}) => {
  const city = cities[activeCity];
  const centerCoord = CityCoord[city];
  const offersCoord = offers.map((it) => it.coord);
  const placesCount = offers.length;
  const activeCoord = activeOffer ? activeOffer.coord : null;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList cities={cities} activeItem={activeCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {city}</b>
              <SortListWithOpenState activeItem={sortType} />
              <PlaceCardList offers={offers} isNearPlaces={isNearPlaces} />
            </section>
            <div className="cities__right-section">
              <section className='cities__map map'>
                <OffersMap centerCoord={centerCoord} offersCoord={offersCoord} activeCoord={activeCoord} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.array.isRequired,
  isNearPlaces: PropTypes.bool.isRequired,
  cities: PropTypes.array.isRequired,
  activeCity: PropTypes.number.isRequired,
  activeOffer: PropTypes.object
};

export default Main;
