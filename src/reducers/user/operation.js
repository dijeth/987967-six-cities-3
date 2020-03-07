import ActionCreator from './action-creator.js';
// import Adapter from '../adapter/adapter.js';
import {AuthorizationStatus} from '../../const/const.js';

export const Operation = {
  getAuthorizationStatus: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        // const data = Adapter.rawToData(response.data);

        dispatch(ActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
      }).catch((err) => console.log);
  }
};
