import UserActionCreator from './action-creator.js';
import AppActionCreator from '../app/action-creator.js';
import DataActionCreator from '../data/action-creator.js';
import { AuthorizationStatus, AppRoute, ServerRoute, ServerError } from '../../const/const.js';
import Adapter from '../../adapter/adapter.js';
import history from '../../history.js'

export const Operation = {
  getAuthorizationStatus: () => (dispatch, getState, api) => {
    return api.get(ServerRoute.getLogin())
      .then((response) => {
        const authData = Adapter.getUser(response.data);

        dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.changeAuthInfo(authData));
      });
  },

  authorizeUser: (userData, path) => (dispatch, getState, api) => {
    dispatch(AppActionCreator.changeLoadingStatus(true));

    return api.post(ServerRoute.getLogin(), userData)
      .then((response) => {
        const authData = Adapter.getUser(response.data);

        dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.changeAuthInfo(authData));
        history.goBack()
      })
      .catch(() => {
        dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.NO_AUTH));
        dispatch(UserActionCreator.changeAuthInfo(null));
      })
      .finally(() => {
        dispatch(AppActionCreator.changeLoadingStatus(false));
      })
  },

  submitComment: (commentData, offerID) => (dispatch, getState, api) => {
    dispatch(AppActionCreator.changeCommentSendingStatus(true));
    return api.post(ServerRoute.getComments(offerID), commentData)
      .then((response) => {
        const comments = Adapter.getComments(response.data);
        dispatch(DataActionCreator.loadComments(comments));
        dispatch(AppActionCreator.setCommentError(false));
      })
      .catch((err) => {
        dispatch(AppActionCreator.setCommentError(true));
        if (err.response && err.response.status === ServerError.UNAUTHORIZED) {
          history.push(AppRoute.getLogin())
        }
      })
      .finally(() => {
        dispatch(AppActionCreator.changeCommentSendingStatus(false));
      });
  }
};
