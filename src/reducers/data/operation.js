import DataActionCreator from './action-creator.js';
import AppActionCreator from '../app/action-creator.js';
import UserActionCreator from '../user/action-creator.js';
import Adapter from '../../adapter/adapter.js';
import {ServerRoute, AppRoute, ServerError} from '../../const/const.js';
import history from '../../history.js';

const loadNearby = (id, api) => api.get(ServerRoute.getNearby(id));
const loadComments = (id, api) => api.get(ServerRoute.getComments(id));

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    dispatch(AppActionCreator.increaseLoad());
    return api.get(ServerRoute.getHotels())
      .then((response) => {
        const data = Adapter.getData(response.data);

        dispatch(DataActionCreator.loadOffers(data.offers));
        dispatch(DataActionCreator.loadCities(data.cities));
        dispatch(AppActionCreator.changeCity(data.cities[0].name));
      })
      .finally(() => {
        dispatch(AppActionCreator.decreaseLoad());
      });
  },

  loadProperties: (id) => (dispatch, getState, api) => {
    dispatch(AppActionCreator.increaseLoad());

    return Promise.all([loadNearby(id, api), loadComments(id, api)])
      .then(([nearbyData, commentData]) => {
        const nearbyList = Adapter.getData(nearbyData.data).offers;
        dispatch(DataActionCreator.loadNearby(nearbyList));

        const commentList = Adapter.getComments(commentData.data);
        dispatch(DataActionCreator.loadComments(commentList));
      })
      .finally(() => {
        dispatch(AppActionCreator.decreaseLoad());
      });
  },

  loadNearbyList: (id) => (dispatch, getState, api) => {
    return loadNearby(id, api)
      .then((nearbyData) => {
        const nearbyList = Adapter.getData(nearbyData.data).offers;
        dispatch(DataActionCreator.loadNearby(nearbyList));
      });
  },

  updateFavorites: () => (dispatch, getState, api) => {
    dispatch(AppActionCreator.increaseLoad());
    return api.get(ServerRoute.getFavorites())
      .then((response) => {
        const data = Adapter.getData(response.data).offers;
        data.forEach((it) => {
          dispatch(DataActionCreator.replaceOffer(it));
        });
      })
      .catch(() => {})
      .finally(() => {
        dispatch(AppActionCreator.decreaseLoad());
      });
  },

  changeFavorite: (id, status) => (dispatch, getState, api) => {
    return api.post(ServerRoute.postFavorites(id, status))
      .then((response) => {
        const offer = Adapter.getOffer(response.data);
        dispatch(DataActionCreator.replaceOffer(offer));
      })
      .catch((err) => {
        if (err.response && err.response.status === ServerError.UNAUTHORIZED) {
          history.push(AppRoute.getLogin());
        } else {
          throw err;
        }
      });
  },

  submitComment: (commentData, offerID) => (dispatch, getState, api) => {
    dispatch(AppActionCreator.changeCommentSendingStatus(true));
    return api.post(ServerRoute.getComments(offerID), commentData)
      .then((response) => {
        const comments = Adapter.getComments(response.data);
        dispatch(DataActionCreator.loadComments(comments));
        dispatch(AppActionCreator.changeCommentSendingStatus(false));
        dispatch(UserActionCreator.resetUserReview());
      })
      .catch((err) => {
        dispatch(AppActionCreator.changeCommentSendingStatus(false));
        if (err.response && err.response.status === ServerError.UNAUTHORIZED) {
          history.push(AppRoute.getLogin());
        }
      });
  }
};
