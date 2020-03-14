import UserActionCreator from './action-creator.js';
import AppActionCreator from '../app/action-creator.js';
import DataActionCreator from '../data/action-creator.js';
import {AuthorizationStatus, AppRoute} from '../../const/const.js';
import Adapter from '../../adapter/adapter.js';

export const Operation = {
  getAuthorizationStatus: () => (dispatch, getState, api) => {
    return api.get(AppRoute.getLogin())
      .then((response) => {
        const authData = Adapter.getUser(response.data);

        dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.changeAuthInfo(authData));
      });
  },

  authorizeUser: (userData, newPath) => (dispatch, getState, api) => {
    return api.post(AppRoute.getLogin(), userData)
      .then((response) => {
        const authData = Adapter.getUser(response.data);

        dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.changeAuthInfo(authData));

        if (newPath) {
          document.location.pathname = newPath;
        }
      })
      .catch(() => {
        dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.NO_AUTH));
        dispatch(UserActionCreator.changeAuthInfo(null));
        dispatch(AppActionCreator.setPageError(`Введен некорректный e-mail`));
      });
  },

  submitComment: (commentData, offerID) => (dispatch, getState, api) => {
    dispatch(AppActionCreator.changeCommentSendingStatus(true));
    return api.post(AppRoute.getComments(offerID), commentData)
      .then((response) => {
        const comments = Adapter.getComments(response.data);
        dispatch(DataActionCreator.loadComments(comments));
        dispatch(AppActionCreator.setCommentError(false));
      })
      .catch(() => {
        dispatch(AppActionCreator.setCommentError(true));
        dispatch(AppActionCreator.setPageError(`Ошибка при отправке комментария`));
      })
      .finally(() => {
        dispatch(AppActionCreator.changeCommentSendingStatus(false));
      });
  }
};
