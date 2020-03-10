import ActionType from '../action-type.js';
import ActionCreator from './action-creator.js';
import {AuthorizationStatus} from '../../const/const.js';

describe(`User ActionCreator Test`, () => {

  it(`should return a correct action for changeAuthorizationStatus`, () => {
    expect(ActionCreator.changeAuthorizationStatus(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.CHANGE_AUTH_STATUS,
      payload: AuthorizationStatus.NO_AUTH
    });
  });

  it(`should return a correct action for changeAuthInfo`, () => {
    expect(ActionCreator.changeAuthInfo({email: `aaa@ee.ee`})).toEqual({
      type: ActionType.CHANGE_AUTH_INFO,
      payload: {email: `aaa@ee.ee`}
    });
  });
});
