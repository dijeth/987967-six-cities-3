import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {SORT_LIST, MainScreenType} from '../../const/const.js';
import {cityPropType} from '../../const/props.js';
import OffersMap from '../offers-map/offers-map.jsx';
import CityList from '../city-list/city-list.jsx';
import SortList from '../sort-list/sort-list.jsx';
import Header from '../header/header.jsx';
import MainEmpty from '../main-empty/main-empty.jsx';
import {connect} from 'react-redux';
import {getSortType, getActiveCity} from '../../reducers/app/selectors.js';
import {getCities} from '../../reducers/data/selectors.js';
import {getSortedOffers} from '../../reducers/selectors.js';
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
import withOpenState from '../../hocs/with-open-state/with-open-state.jsx';
import withLoading from '../../hocs/with-loading/with-loading.jsx';
import SignIn from '../sign-in/sign-in.jsx';

const SortListWithOpenState = withOpenState(SortList);

const PageMain = ({offers, cities, activeCity, sortType}) => {

  if (offers.length === 0 || activeCity === null) {
    return null;
  }

  const {name: cityName, centerCoord, zoom} = activeCity;
  const offersCoord = offers.map((it) => it.coord);
  const placesCount = offers.length;

  return (
    <div className="page page--gray page--main">
      <Header isActiveLogo={true} isAuthorized={false} />
      <main className={`page__main page__main--index ${offers.length === 0 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList items={cities} activeItem={activeCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {cityName}</b>
              <SortListWithOpenState items={SORT_LIST} activeItem={sortType} />
              <PlaceCardList items={ offers } isNearPlaces={false} />
            </section>
            <div className="cities__right-section">
              <section className='cities__map map'>
              {<OffersMap centerCoord={centerCoord} offersCoord={offersCoord} zoom={zoom} />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

PageMain.propTypes = {
  activeCity: cityPropType,
  cities: PropTypes.arrayOf(cityPropType).isRequired,
  offers: PropTypes.array.isRequired,
  sortType: PropTypes.string,
};

const mapStateToProps = (state) => ({
  sortType: getSortType(state),
  activeCity: getActiveCity(state),
  cities: getCities(state),
  offers: getSortedOffers(state),
  isAuthorized: getAuthorizationStatus(state)
});

export {PageMain};
export default withLoading(connect(mapStateToProps)(PageMain));
