import DataActionCreator from './data/action-creator.js';
import AppActionCreator from './app/action-creator.js';
import Adapter from '../adapter/adapter.js';
import {AppRoute} from '../const/const.js';

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    dispatch(AppActionCreator.changeLoadingStatus(true));

    return api.get(AppRoute.getHotels())
      .then((response) => {
        const data = Adapter.getData(response.data);

        dispatch(DataActionCreator.loadOffers(data.offers));
        dispatch(DataActionCreator.loadCities(data.cities));
        dispatch(AppActionCreator.changeCity(data.cities[0]));

        dispatch(AppActionCreator.changeLoadingStatus(false));
      });
  },

  loadNearby: (id) => (dispatch, getState, api) => {
    return api.get(AppRoute.getNearby(id))
      .then((response) => {
        const nearbyData = Adapter.getData(response.data).offers;
        dispatch(DataActionCreator.loadNearby(nearbyData));
      });
  },

  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(AppRoute.getComments(id))
      .then((response) => {
        const commentData = Adapter.getComments(response.data);
        dispatch(DataActionCreator.loadComments(commentData));
      });
  }
};
