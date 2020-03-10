import ActionType from '../action-type.js';

const ActionCreator = {
  changeAuthorizationStatus: (authStatus) => ({type: ActionType.CHANGE_AUTH_STATUS, payload: authStatus}),
  changeAuthInfo: (authInfo) => ({type: ActionType.CHANGE_AUTH_INFO, payload: authInfo})
};

export default ActionCreator;
