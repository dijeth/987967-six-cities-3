import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {connect} from 'react-redux';
import {getFavorites} from '../../reducers/data/selectors.js';
import ActionCreator from '../../reducers/app/action-creator.js';
import {PlaceCardType, AppRoute} from '../../const/const.js';
import {Link} from 'react-router-dom';

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

const OffersFavorite = ({favoriteItems, isAuth, onCityClick}) => {
	const {cities, offers} = splitOffersByCity(favoriteItems);
	const items = cities.map((city) => {
		return (
			<li className="favorites__locations-items" key={city}>
	      <div className="favorites__locations locations locations--current">
	        <div className="locations__item">
	          <Link to={AppRoute.getRoot()} className="locations__item-link" onClick={() => {onCityClick(city)}}>
	            <span>{city}</span>
	          </Link>
	        </div>
	      </div>
	      <PlaceCardList items={offers[city]} isAuth={isAuth} type={PlaceCardType.FAVORITE} />
	    </li>)
	});


  return <ul className="favorites__list">{items}</ul>;
};

OffersFavorite.propTypes = {
  favoriteItems: PropTypes.array,
  isAuth: PropTypes.bool,
  onCityClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  favoriteItems: getFavorites(state)
});

const mapDispatchToProps = (dispatch) => ({
	onCityClick(city) {
		dispatch(ActionCreator.changeCity(city))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OffersFavorite);
