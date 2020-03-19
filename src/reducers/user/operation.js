import UserActionCreator from './action-creator.js';
import AppActionCreator from '../app/action-creator.js';
import {AuthorizationStatus, ServerRoute} from '../../const/const.js';
import Adapter from '../../adapter/adapter.js';
import history from '../../history.js';

export const Operation = {
  getAuthorizationStatus: () => (dispatch, getState, api) => {
    return api.get(ServerRoute.getLogin())
      .then((response) => {
        const authData = Adapter.getUser(response.data);

        dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.changeAuthInfo(authData));
      });
  },

  authorizeUser: (userData) => (dispatch, getState, api) => {
    dispatch(AppActionCreator.increaseLoad());

    return api.post(ServerRoute.getLogin(), userData)
      .then((response) => {
        const authData = Adapter.getUser(response.data);

        dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.changeAuthInfo(authData));
        history.goBack();
      })
      .catch(() => {
        dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.NO_AUTH));
        dispatch(UserActionCreator.changeAuthInfo(null));
      })
      .finally(() => {
        dispatch(AppActionCreator.decreaseLoad());
      });
  },
};
