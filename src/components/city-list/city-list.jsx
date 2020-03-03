import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ActionCreator from '../../action-creator.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const CityList = ({items, activeItem, onListClick}) => {
  const cityList = items.map((it, i) => {
    return (
      <li className="locations__item" key={`${it}-${i}`}>
        <a className={`locations__item-link tabs__item ${it === activeItem ? `tabs__item--active` : ``}`} href="#">
          <span data-index={i}>{it}</span>
        </a>
      </li>);
  });

  return <ul className="locations__list tabs__list" onClick={onListClick ? onListClick : null}>{cityList}</ul>;
};

CityList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeItem: PropTypes.string,
  onActiveItemChange: PropTypes.func,
  onListClick: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  onActiveItemChange(activeCity) {
    dispatch(ActionCreator.changeCity(activeCity));
  }
});

const connectedCityList = connect(null, mapDispatchToProps)(withActiveItem(CityList));

export {CityList};
export default connectedCityList;
