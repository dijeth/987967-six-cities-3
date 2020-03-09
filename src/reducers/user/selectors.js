import NameSpace from '../name-space.js';
import {AuthorizationStatus} from '../../const/const.js'

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus === AuthorizationStatus.AUTH;
export const getUserPicture = (state) => state[NameSpace.USER].authInfo && state[NameSpace.USER].authInfo.userPic;
export const getEmail = (state) => state[NameSpace.USER].authInfo && state[NameSpace.USER].authInfo.email;
export const getIsUserSuper = (state) => state[NameSpace.USER].authInfo && state[NameSpace.USER].authInfo.isUserSuper;

const Selector = {
  getAuthorizationStatus
};

export default Selector;
