import NameSpace from "../name-space.js";
import { FavoriteOffers } from "../../interfaces";

export const getOffers = (state) => state[NameSpace.DATA].offers;
export const getCities = (state) => state[NameSpace.DATA].cities;
export const getNearbyList = (state) => state[NameSpace.DATA].nearbyList;
export const getComments = (state) => state[NameSpace.DATA].comments;

export const getFavorites = (state) => {
  const favoriteOffers = state[NameSpace.DATA].offers.filter((it) => it.isFavorite);
  const splittedOffers: FavoriteOffers = {};

  favoriteOffers.forEach((it) => {
    const { city } = it;

    if (splittedOffers[city] === undefined) {
      splittedOffers[city] = [it];
    } else {
      splittedOffers[city].push(it)
    };
  });

  return {
    cities: Object.keys(splittedOffers).sort(),
    offers: splittedOffers,
  };
};

export const getNearbyCoordList = (state) =>
  getNearbyList(state).map((it) => it.coord);
