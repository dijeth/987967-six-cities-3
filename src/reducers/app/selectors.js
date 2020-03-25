import {SortType} from '../../const/const';
import NameSpace from '../name-space.js';
import {getCities} from '../data/selectors';

export const getPageError = (state) => state[NameSpace.APP].pageError;
export const getLoading = (state) => state[NameSpace.APP].loading;
export const getCommentSendingStatus = (state) => state[NameSpace.APP].isCommentSending;
export const getSortType = (state) => state[NameSpace.APP].sortType || SortType.POPULAR;
export const getActiveOfferID = (state) => state[NameSpace.APP].activeOffer;

export const getActiveOffer = (state) => {
  const activeOffer = state[NameSpace.DATA].offers.find((it) => it.id === state[NameSpace.APP].activeOffer);
  return activeOffer === undefined ? null : activeOffer;
};

export const getActiveOfferCoord = (state) => {
  const activeOffer = getActiveOffer(state);
  return activeOffer ? activeOffer.coord : null;
};

export const getActiveCityName = (state) => state[NameSpace.APP].activeCity;

export const getActiveCity = (state) => {
  const activeCity = getActiveCityName(state);
  if (activeCity === null) {
    return null;
  }

  const cities = getCities(state);

  return cities.find((it) => it.name === activeCity);
};
