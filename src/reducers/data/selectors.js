import NameSpace from '../name-space.js';

export const getOffers = (state) => state[NameSpace.DATA].offers || [];
export const getCities = (state) => state[NameSpace.DATA].cities || [];
export const getNearbyList = (state) => state[NameSpace.DATA].nearbyList || [];
