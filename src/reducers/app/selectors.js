import {SortType, ScreenType} from '../../const/const.js';
import NameSpace from '../name-space.js';

export const getSortType = (state) => state[NameSpace.APP].sortType || SortType.POPULAR;
export const getScreenType = (state) => state[NameSpace.APP].screenType || ScreenType.MAIN;
export const getActiveCity = (state) => state[NameSpace.APP].activeCity;
export const getActiveOffer = (state) => state[NameSpace.APP].activeOffer;
export const getActiveOfferCoord = (state) => {
  const activeOffer = getActiveOffer(state);
  return activeOffer !== null ? activeOffer.coord : null;
};

export const getActiveCityName = (state) => {
  const activeCity = getActiveCity(state);
  return activeCity ? activeCity.name : null;
};

const AppSelector = {
  getSortType,
  getScreenType,
  getActiveCity,
  getActiveOffer,
  getActiveCityName,
  getActiveOfferCoord
};

export default AppSelector;
