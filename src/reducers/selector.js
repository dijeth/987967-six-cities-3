import { createSelector } from 'reselect';
import { sortOffers } from '../util.js';

const getOffers = (state) => state.offers || null;
const getActiveCityName = (state) => state.activeCity && state.activeCity.name || null;
const getSortType = (state) => state.sortType || null;

export const getSortedOffers = createSelector(
  [
    getOffers,
    getActiveCityName,
    getSortType
  ],

  (offers, activeCityName, sortType) => {
    if (offers !== null && activeCityName !== null && sortType !== null) {
      const selectedOffers = offers.filter((it) => it.city === activeCityName);
      return sortOffers(selectedOffers, sortType)
    };

    return []
  }
);
