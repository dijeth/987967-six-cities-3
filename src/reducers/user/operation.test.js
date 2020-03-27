import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {Operation} from './operation.js';
import ActionType from '../action-type.js';
import Adapter from '../../adapter/adapter.js';
import {AuthorizationStatus} from '../../const/const';

const api = createAPI(() => undefined);
const apiMock = new MockAdapter(api);

const responseUser = {
  [`avatar_url`]: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 1,
  [`is_pro`]: false,
  name: `Oliver.conner`
};

const convertedUser = Adapter.getUser(responseUser);

it(`should call a dispatch twice with correct payload when user is authorized`, () => {
  const dispatch = jest.fn();

  apiMock.onGet(`/login`).reply(200, responseUser);

  const loader = Operation.getAuthorizationStatus();

  return loader(dispatch, () => undefined, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_AUTH_STATUS,
        payload: AuthorizationStatus.AUTH
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_AUTH_INFO,
        payload: convertedUser
      });
    });
});

it(`should call a dispatch 4 times with correct payload when user is authorized`, () => {
  const dispatch = jest.fn();
  const user = {
    email: `Oliver.conner@gmail.com`,
    password: `123`
  };

  apiMock.onPost(`/login`, user).reply(200, responseUser);

  const loader = Operation.authorizeUser(user);

  return loader(dispatch, () => undefined, api)
    .then(() => {

      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.INCREASE_LOAD,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_AUTH_STATUS,
        payload: AuthorizationStatus.AUTH
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_AUTH_INFO,
        payload: convertedUser
      });

      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.DECREASE_LOAD,
      });
    });
});

it(`should call a dispatch 4 times with correct payload when user is not authorized`, () => {
  const dispatch = jest.fn();
  const user = {
    email: `Oliver.conner@gmail.com`,
    password: `123`
  };

  apiMock.onPost(`/login`, user).reply(401);

  const loader = Operation.authorizeUser(user);

  return loader(dispatch, () => undefined, api)
    .then(() => {

      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.INCREASE_LOAD,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_AUTH_STATUS,
        payload: AuthorizationStatus.NO_AUTH
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_AUTH_INFO,
        payload: null
      });

      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.DECREASE_LOAD,
      });
    });
});
