import * as React from 'react';
import {connect} from 'react-redux';
import ActionCreator from '../../reducers/app/action-creator.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {cityPropType} from '../../const/props.js';
import { City } from '../../interfaces.js';

type Props = {
  items: Array<City>;
  activeItem: City;
  onListClick: (evt: React.MouseEvent<HTMLElement>) => void;
};

const CityList: React.FC<Props> = ({items, activeItem, onListClick}) => {
  if (!items.length) {
    return null;
  }

  const cityName = activeItem !== null ? activeItem.name : null;
  const cityList = items.map((it, i) => {
    return (
      <li className="locations__item" key={`${it}-${i}`}>
        <a className={`locations__item-link tabs__item ${it.name === cityName ? `tabs__item--active` : ``}`} href="#">
          <span data-index={i}>{it.name}</span>
        </a>
      </li>);
  });

  return <ul className="locations__list tabs__list" onClick={onListClick ? onListClick : null}>{cityList}</ul>;
};

const mapDispatchToProps = (dispatch) => ({
  onActiveItemChange(activeCity) {
    dispatch(ActionCreator.changeCity(activeCity.name));
  }
});

const connectedCityList = connect(null, mapDispatchToProps)(withActiveItem<City>(CityList));

export {CityList};
export default connectedCityList;
