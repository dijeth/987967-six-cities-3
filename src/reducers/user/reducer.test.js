import reducer from './reducer.js';
import ActionType from '../action-type.js';
import {AuthorizationStatus} from '../../const/const.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: null
};

describe(`Test User reducer`, () => {
  it(`should return initialState when called with an unknown action`, () => {
    expect(reducer(undefined, {type: undefined}))
      .toEqual(initialState);
  });

  it(`should change an "authorizationStatus" status by payload`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: null
    }, {
      type: ActionType.CHANGE_AUTH_STATUS,
      payload: AuthorizationStatus.AUTH
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
      authInfo: null
    });
  });

  it(`should change an "authInfo" status by payload`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: null
    }, {
      type: ActionType.CHANGE_AUTH_INFO,
      payload: `email`
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: `email`
    });
  });
});
