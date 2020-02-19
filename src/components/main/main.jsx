import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {CITIES} from '../../const.js';
import Map from '../map/map.jsx';

const ACTIVE_CITY_INDEX = 3;

const Main = ({placesCount, offerList, onCardClick: handleCardClick}) => {
  const cityList = CITIES.map((it, i) => {
    return (
      <li className="locations__item" key={`${it}-${i}`}>
        <a className={`locations__item-link tabs__item ${i === ACTIVE_CITY_INDEX ? `tabs__item--active` : ``}`} href="#">
          <span>{it}</span>
        </a>
      </li>);
  });

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
            <ul className="locations__list tabs__list">
              {cityList}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {CITIES[ACTIVE_CITY_INDEX]}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <PlaceCardList offerList={offerList} onCardClick={handleCardClick} />
            </section>
            <div className="cities__right-section">
              <Map centerCoords={[52.38333, 4.9]} currentOffer={[52.38333, 4.9]} nearOffers={[[52.38333, 4.9]]} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  placesCount: PropTypes.number.isRequired,
  offerList: PropTypes.array.isRequired,
  onCardClick: PropTypes.func
};

export default Main;
