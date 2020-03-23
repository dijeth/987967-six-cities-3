import * as React from 'react';
import OffersMain from '../offers-main/offers-main';
import {SORT_LIST, SortType} from '../../const/const';
import {cityPropType} from '../../const/props.js';
import OffersMap from '../offers-map/offers-map.jsx';
import CityList from '../city-list/city-list';
import SortList from '../sort-list/sort-list';
import Header from '../header/header';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
import {getSortType, getActiveCity} from '../../reducers/app/selectors.js';
import {getCities} from '../../reducers/data/selectors.js';
import {getCityOffersCoords} from '../../reducers/data/reselectors.js';
import withOpenState from '../../hocs/with-open-state/with-open-state.jsx';
import withLoading from '../../hocs/with-loading/with-loading.jsx';
import withPageError from '../../hocs/with-page-error/with-page-error.jsx';
import { City } from '../../interfaces';
import { coord } from '../../types';

const SortListWithOpenState = withOpenState(SortList);

type Props = {
  activeCity: City;
  cities: Array<City>;
  offersCoord: Array<coord>;
  sortType: SortType;
  isAuth: boolean;
};

const PageMain: React.FC<Props> = ({offersCoord, cities, activeCity, sortType, isAuth}) => {

  const {name: cityName, centerCoord, zoom} = activeCity;
  const placesCount = offersCoord.length;

  return (
    <div className="page page--gray page--main">
      <Header isActiveLogo={true} />
      <main className={`page__main page__main--index ${placesCount === 0 ? `page__main--index-empty` : ``}`}>
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
              <OffersMain isAuth={isAuth}/>
            </section>
            <div className="cities__right-section">
              <section className='cities__map map'>
                <OffersMap centerCoord={centerCoord} offersCoord={offersCoord} zoom={zoom} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sortType: getSortType(state),
  activeCity: getActiveCity(state),
  cities: getCities(state),
  offersCoord: getCityOffersCoords(state),
  isAuth: getAuthorizationStatus(state)
});

export {PageMain};
export default withPageError(withLoading(connect(mapStateToProps)(PageMain)));
