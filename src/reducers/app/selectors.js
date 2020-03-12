import {SortType} from '../../const/const.js';
import NameSpace from '../name-space.js';

export const getLoadingStatus = (state) => state[NameSpace.APP].isLoading;
export const getSortType = (state) => state[NameSpace.APP].sortType || SortType.POPULAR;
export const getActiveCity = (state) => state[NameSpace.APP].activeCity;
export const getActiveOfferID = (state) => state[NameSpace.APP].activeOffer;
export const getActiveOffer = (state) => {
  const activeOffer = state[NameSpace.DATA].offers.find((it) => it.id === state[NameSpace.APP].activeOffer);
  return activeOffer === undefined ? null : activeOffer;
};
export const getActiveOfferCoord = (state) => {
  const activeOffer = getActiveOffer(state);
  return activeOffer ? activeOffer.coord : null;
};

export const getActiveCityName = (state) => {
  const activeCity = getActiveCity(state);
  return activeCity ? activeCity.name : null;
};

const AppSelector = {
  getSortType,
  getActiveCity,
  getActiveOffer,
  getActiveCityName,
  getActiveOfferCoord
};

export default AppSelector;
