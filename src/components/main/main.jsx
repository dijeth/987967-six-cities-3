import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {SORT_LIST} from '../../const/const.js';
import {cityPropType} from '../../const/props.js';
import OffersMap from '../offers-map/offers-map.jsx';
import CityList from '../city-list/city-list.jsx';
import SortList from '../sort-list/sort-list.jsx';
import MainEmpty from '../main-empty/main-empty.jsx';
import {connect} from 'react-redux';
import {getSortType, getActiveCity} from '../../reducers/app/selectors.js';
import {getCities} from '../../reducers/data/selectors.js';
import {getSortedOffers} from '../../reducers/selectors.js';
import withOpenState from '../../hocs/with-open-state/with-open-state.jsx';


const SortListWithOpenState = withOpenState(SortList);

const Main = ({offers, cities, activeCity, isNearPlaces, sortType}) => {
  if (offers.length === 0 || activeCity === null) {
    return null;
  }

  const {name: cityName, centerCoord, zoom} = activeCity;
  const offersCoord = offers.map((it) => it.coord);
  const placesCount = offers.length;

  const cityBlock = (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{placesCount} places to stay in {cityName}</b>
        <SortListWithOpenState items={SORT_LIST} activeItem={sortType} />
        <PlaceCardList items={ offers } isNearPlaces={isNearPlaces} />
      </section>
      <div className="cities__right-section">
        <section className='cities__map map'>
          <OffersMap centerCoord={centerCoord} offersCoord={offersCoord} zoom={zoom} />
        </section>
      </div>
    </div>
  );

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

      <main className={`page__main page__main--index ${offers.length === 0 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList items={cities} activeItem={activeCity} />
          </section>
        </div>
        <div className="cities">
          {offers.length === 0 ? <MainEmpty city={cityName} /> : cityBlock}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  activeCity: cityPropType,
  cities: PropTypes.arrayOf(cityPropType).isRequired,
  isNearPlaces: PropTypes.bool.isRequired,
  offers: PropTypes.array.isRequired,
  sortType: PropTypes.string
};

const mapStateToProps = (state) => ({
  sortType: getSortType(state),
  activeCity: getActiveCity(state),
  cities: getCities(state),
  offers: getSortedOffers(state),
});

export default connect(mapStateToProps)(Main);
