import ActionType from '../action-type.js';
import {AuthorizationStatus} from '../../const/const.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTHORIZATION_STATUS:
      return Object.assign({}, state, {authorizationStatus: action.payload});
  }

  return state;
};

export default reducer;
