import ActionType from '../action-type.js';
import {AuthorizationStatus} from '../../const/const.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTH_STATUS:
      return Object.assign({}, state, {authorizationStatus: action.payload});

    case ActionType.CHANGE_AUTH_INFO:
      return Object.assign({}, state, {authInfo: action.payload});
  }

  return state;
};

export default reducer;
