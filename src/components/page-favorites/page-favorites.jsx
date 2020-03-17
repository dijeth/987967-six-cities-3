import React from 'react';
import PropTypes from 'prop-types';
import OffersFavorite from '../offers-favorite/offers-favorite.jsx';
import Header from '../header/header.jsx';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const.js';

const PageFavorites = ({isAuth}) => {

	return (
		<div className="page">
      <Header isActiveLogo={false}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <OffersFavorite isAuth={isAuth} />
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoute.getRoot()} className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>)
};

const mapStateToProps = (state) => ({
  isAuth: getAuthorizationStatus(state)
});


export default connect(mapStateToProps)(PageFavorites);