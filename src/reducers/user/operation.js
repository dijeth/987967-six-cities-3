import ActionCreator from './action-creator.js';
import {AuthorizationStatus, AppRoute} from '../../const/const.js';
import Adapter from '../../adapter/adapter.js';

export const Operation = {
  getAuthorizationStatus: () => (dispatch, getState, api) => {
    return api.get(AppRoute.getLogin())
      .then((response) => {
  			const authData = Adapter.rawUserToData(response.data);
  			
        dispatch(ActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
  			dispatch(ActionCreator.changeAuthInfo(authData));
      }).catch((err) => console.log);
  },
  authorizeUser: (userData, newPath) => (dispatch, getState, api) => {
  	return api.post(AppRoute.getLogin(), userData)
  		.then((response) => {
  			const authData = Adapter.rawUserToData(response.data);

        dispatch(ActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
  			dispatch(ActionCreator.changeAuthInfo(authData));

  			if (newPath) {
  				document.location.pathname = newPath;
  			}
  		})
  		.catch((err) => {
        dispatch(ActionCreator.changeAuthorizationStatus(AuthorizationStatus.NO_AUTH));
  			dispatch(ActionCreator.changeAuthInfo(null));
  		})
  }
};
