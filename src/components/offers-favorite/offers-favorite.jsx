import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {connect} from 'react-redux';
import {getFavorites} from '../../reducers/data/selectors.js';
import {PlaceCardType} from '../../const/const.js';

const splitOffersByCity = (offers) => {
	const splittedOffers = {};

	offers.forEach((it) => {
		const {city} = it;

		if (splittedOffers[city] === undefined) {
			splittedOffers[city] = []
		};

		splittedOffers[city].push(it);
	});

	return {
		cities: Object.keys(splittedOffers).sort(),
		offers: splittedOffers
	}
}

const OffersFavorite = ({favoriteItems, isAuth}) => {
	const {cities, offers} = splitOffersByCity(favoriteItems);
	const items = cities.map((city) => {
		return (
			<li className="favorites__locations-items" key={city}>
	      <div className="favorites__locations locations locations--current">
	        <div className="locations__item">
	          <a className="locations__item-link" href="#">
	            <span>{city}</span>
	          </a>
	        </div>
	      </div>
	      <PlaceCardList items={offers[city]} isAuth={isAuth} type={PlaceCardType.FAVORITE} />
	    </li>)
	});


  return <ul className="favorites__list">{items}</ul>;
};

OffersFavorite.propTypes = {
  favoriteItems: PropTypes.array,
  isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
  favoriteItems: getFavorites(state)
});

export default connect(mapStateToProps)(OffersFavorite);
