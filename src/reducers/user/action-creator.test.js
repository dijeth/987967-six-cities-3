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

  it(`should return a correct action for resetUserReview`, () => {
    expect(ActionCreator.resetUserReview()).toEqual({
      type: ActionType.RESET_USER_REVIEW,
    });
  });

  it(`should return a correct action for userReviewText`, () => {
    expect(ActionCreator.userReviewText(`text`)).toEqual({
      type: ActionType.USER_REVIEW_TEXT,
      payload: `text`
    });
  });

  it(`should return a correct action for userReviewRating`, () => {
    expect(ActionCreator.userReviewRating(4)).toEqual({
      type: ActionType.USER_REVIEW_RATING,
      payload: 4
    });
  });

  it(`should return a correct action for userReviewOfferID`, () => {
    expect(ActionCreator.userReviewOfferID(`111`)).toEqual({
      type: ActionType.USER_REVIEW_OFFER_ID,
      payload: `111`
    });
  });
});
