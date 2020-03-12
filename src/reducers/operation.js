import DataActionCreator from './data/action-creator.js';
import AppActionCreator from './app/action-creator.js';
import Adapter from '../adapter/adapter.js';
import {AppRoute} from '../const/const.js';
import axios from 'axios';

const getNearby = (id, api) => api.get(`/hotels/${id}/nearby`);
const getComments = (id, api) => api.get(`/comments/${id}`);

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    dispatch(AppActionCreator.changeLoadingStatus(true));

    return api.get(`/hotels`)
      .then((response) => {
        const data = Adapter.getData(response.data);

        dispatch(DataActionCreator.loadOffers(data.offers));
        dispatch(DataActionCreator.loadCities(data.cities));
        dispatch(AppActionCreator.changeCity(data.cities[0]));

        dispatch(AppActionCreator.changeLoadingStatus(false));
      });
  },

  loadAddData: (id) => (dispatch, getState, api) => {
    dispatch(AppActionCreator.changeLoadingStatus(true));

    axios.all([getNearby(id, api), getComments(id, api)])
      .then(axios.spread((nearbyList, commentList) => {
        const nearbyData = Adapter.getData(nearbyList.data).offers;
        const commentData = Adapter.getComments(commentList.data);

        dispatch(DataActionCreator.loadNearby(nearbyData));
        dispatch(DataActionCreator.loadComments(commentData));

        dispatch(AppActionCreator.changeLoadingStatus(false))
      }));
  }
};
