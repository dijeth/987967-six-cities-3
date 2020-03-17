import {createSelector} from 'reselect';
import {sortOffers} from '../../util.js';
import {getActiveCityName, getSortType} from '../app/selectors.js';
import NameSpace from '../name-space.js';

export const getOffers = (state) => state[NameSpace.DATA].offers || [];
export const getCities = (state) => state[NameSpace.DATA].cities || [];
export const getNearbyList = (state) => state[NameSpace.DATA].nearbyList || [];
export const getComments = (state) => state[NameSpace.DATA].comments || [];
export const getFavorites = (state) => state[NameSpace.DATA].favorites || [];

export const getNearbyCoordList = (state) => getNearbyList(state).map((it) => it.coord);

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
