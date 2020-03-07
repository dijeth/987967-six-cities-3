import NameSpace from '../name-space.js';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;

const Selector = {
  getAuthorizationStatus
};

export default Selector;
