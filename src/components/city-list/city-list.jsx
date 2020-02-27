import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ActionCreator from '../../action-creator.js';

const handleClick = (evt, handleActiveCityChange) => {
  const index = evt.target.dataset.index;
  evt.preventDefault();
  handleActiveCityChange(Number(index));
};

const CityList = ({cities, activeCity, onChangeActiveCity}) => {
  const cityList = cities.map((it, i) => {
    return (
      <li className="locations__item" key={`${it}-${i}`}>
        <a className={`locations__item-link tabs__item ${i === activeCity ? `tabs__item--active` : ``}`} href="#">
          <span data-index={i}>{it}</span>
        </a>
      </li>);
  });

  return <ul className="locations__list tabs__list" onClick={(evt) => handleClick(evt, onChangeActiveCity)}>{cityList}</ul>;
};

CityList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.number.isRequired,
  onChangeActiveCity: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onChangeActiveCity(activeCity) {
    dispatch(ActionCreator.changeCity(activeCity));
    dispatch(ActionCreator.selectOffers());
  }
});

export {CityList};
export default connect(null, mapDispatchToProps)(CityList);
