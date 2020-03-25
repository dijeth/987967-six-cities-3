import {createSelector} from 'reselect';
import {sortOffers} from '../../util.js';
import {getOffers} from '../data/selectors';
import {getActiveCityName, getSortType} from '../app/selectors.js';

export const getSortedOffers = createSelector(
    [
      getOffers,
      getActiveCityName,
      getSortType
    ],

    (offers, activeCityName, sortType) => {
      if (offers.length === 0) {
        return [];
      }

      const selectedOffers = activeCityName !== null ? offers.filter((it) => it.city === activeCityName) : offers;

      return sortOffers(selectedOffers, sortType);
    }
);

export const getCityOffersCoords = createSelector(
    [
      getOffers,
      getActiveCityName,
    ],

    (offers, activeCityName) => {
      if (offers.length === 0) {
        return [];
      }

      const selectedOffers = activeCityName !== null ? offers.filter((it) => it.city === activeCityName) : offers;

      return selectedOffers.map((it) => it.coord);
    }
);

