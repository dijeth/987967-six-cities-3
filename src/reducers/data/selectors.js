import NameSpace from '../name-space.js';

export const getOffers = (state) => state[NameSpace.DATA].offers || [];
export const getCities = (state) => state[NameSpace.DATA].cities || [];
export const getNearbyList = (state) => state[NameSpace.DATA].nearbyList || [];
export const getComments = (state) => state[NameSpace.DATA].comments || [];
export const getFavorites = (state) => state[NameSpace.DATA].offers.filter((it) => it.isFavorite);

export const getNearbyCoordList = (state) => getNearbyList(state).map((it) => it.coord);
