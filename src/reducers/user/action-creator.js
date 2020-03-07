import ActionType from '../action-type.js';

const ActionCreator = {
  changeAuthorizationStatus: (authStatus) => ({type: ActionType.CHANGE_AUTH_STATUS, payload: authStatus})
};

export default ActionCreator;
