import DataActionCreator from './action-creator.js';
import AppActionCreator from '../app/action-creator.js';
import Adapter from '../../adapter/adapter.js';
import {ServerRoute, AppRoute} from '../../const/const.js';

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(ServerRoute.getHotels())
      .then((response) => {
        const data = Adapter.getData(response.data);

        dispatch(DataActionCreator.loadOffers(data.offers));
        dispatch(DataActionCreator.loadCities(data.cities));
        dispatch(AppActionCreator.changeCity(data.cities[0]));
      });
  },

  loadNearby: (id) => (dispatch, getState, api) => {
    return api.get(ServerRoute.getNearby(id))
      .then((response) => {
        const nearbyData = Adapter.getData(response.data).offers;
        dispatch(DataActionCreator.loadNearby(nearbyData));
      });
  },

  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(ServerRoute.getComments(id))
      .then((response) => {
        const commentData = Adapter.getComments(response.data);
        dispatch(DataActionCreator.loadComments(commentData));
      });
  },

  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(ServerRoute.getFavorites())
      .then((response) => {
        const data = Adapter.getData(response.data).offers;
        dispatch(DataActionCreator.loadFavorites(data));
      });
  }
};
