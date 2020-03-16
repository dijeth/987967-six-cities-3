import DataActionCreator from './action-creator.js';
import AppActionCreator from '../app/action-creator.js';
import Adapter from '../../adapter/adapter.js';
import { ServerRoute, AppRoute, ServerError } from '../../const/const.js';
import history from '../../history.js';

const loadNearby = (id, api) => api.get(ServerRoute.getNearby(id));
const loadComments = (id, api) => api.get(ServerRoute.getComments(id));

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

  loadProperties: (id) => (dispatch, getState, api) => {
    dispatch(AppActionCreator.changeLoadingStatus(true));

    return Promise.all([loadNearby(id, api), loadComments(id, api)])
      .then(([nearbyData, commentData]) => {
        const nearbyList = Adapter.getData(nearbyData.data).offers;
        dispatch(DataActionCreator.loadNearby(nearbyList));

        const commentList = Adapter.getComments(commentData.data);
        dispatch(DataActionCreator.loadComments(commentList));
      })
      .finally(() => {
        dispatch(AppActionCreator.changeLoadingStatus(false));
      });
  },

  loadNearbyList: (id) => (dispatch, getState, api) => {
    return loadNearby(id, api)
      .then((nearbyData) => {
        const nearbyList = Adapter.getData(nearbyData.data).offers;
        dispatch(DataActionCreator.loadNearby(nearbyList));
      })
  },

  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(ServerRoute.getFavorites())
      .then((response) => {
        const data = Adapter.getData(response.data).offers;
        dispatch(DataActionCreator.loadFavorites(data));
      });
  },

  changeFavorite: (id, status) => (dispatch, getState, api) => {
    return api.post(ServerRoute.postFavorites(id, status))
      .then((response) => {
        const offer = Adapter.getOffer(response.data);
        dispatch(DataActionCreator.replaceOffer(offer))
      })
      .catch((err) => {
        if (err.response && err.response.status === ServerError.UNAUTHORIZED) {
          history.push(AppRoute.getLogin())
        }
      })
  }
};
