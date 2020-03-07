import NameSpace from '../name-space.js';
import {AuthorizationStatus} from '../../const/const.js'

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus === AuthorizationStatus.AUTH;

const Selector = {
  getAuthorizationStatus
};

export default Selector;
