import * as React from 'react';
import OffersFavorite from '../offers-favorite/offers-favorite';
import Header from '../header/header';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
import {getFavorites} from '../../reducers/data/selectors.js';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import {OfferMini} from '../../interfaces';

type Props = {
  isAuth: boolean;
  favoriteData: {
    offers: Array<OfferMini>;
    cities: Array<string>;
  };
};

const PageFavorites: React.FC<Props> = ({isAuth, favoriteData}) => {
  const {offers: favoriteOffers, cities} = favoriteData;
  const classList = `page__main page__main--favorites ${favoriteOffers.length === 0 ? `page__main--favorites-empty` : ``}`;

  return (
    <div className="page">
      <Header isActiveLogo={false}/>

      <main className={classList}>
        <div className="page__favorites-container container">
          {cities.length === 0 ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>
            </section>) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <OffersFavorite offers={favoriteOffers} cities={cities} isAuth={isAuth} />
            </section>)}
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoute.getRoot()} className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>);
};

const mapStateToProps = (state) => ({
  isAuth: getAuthorizationStatus(state),
  favoriteData: getFavorites(state)
});

export {PageFavorites};
export default connect(mapStateToProps)(PageFavorites);
