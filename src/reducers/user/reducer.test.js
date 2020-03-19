import reducer from './reducer.js';
import ActionType from '../action-type.js';
import {AuthorizationStatus, EMPTY_REVIEW} from '../../const/const.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: null,
  userReviewText: EMPTY_REVIEW.text,
  userReviewRating: EMPTY_REVIEW.rating,
  userReviewOfferID: EMPTY_REVIEW.offerID,
};

describe(`Test User reducer`, () => {
  it(`should return initialState when called with an unknown action`, () => {
    expect(reducer(undefined, {type: undefined}))
      .toEqual(initialState);
  });

  it(`should change an "authorizationStatus" status by payload`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: null,
      userReviewText: EMPTY_REVIEW.text,
      userReviewRating: EMPTY_REVIEW.rating,
      userReviewOfferID: EMPTY_REVIEW.offerID,
    }, {
      type: ActionType.CHANGE_AUTH_STATUS,
      payload: AuthorizationStatus.AUTH
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
      authInfo: null,
      userReviewText: EMPTY_REVIEW.text,
      userReviewRating: EMPTY_REVIEW.rating,
      userReviewOfferID: EMPTY_REVIEW.offerID,
    });
  });

  it(`should change an "authInfo" status by payload`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: null,
      userReviewText: EMPTY_REVIEW.text,
      userReviewRating: EMPTY_REVIEW.rating,
      userReviewOfferID: EMPTY_REVIEW.offerID,
    }, {
      type: ActionType.CHANGE_AUTH_INFO,
      payload: `email`
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: `email`,
      userReviewText: EMPTY_REVIEW.text,
      userReviewRating: EMPTY_REVIEW.rating,
      userReviewOfferID: EMPTY_REVIEW.offerID,
    });
  });

  it(`should change an "userReviewText" status by payload`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: `email`,
      userReviewText: EMPTY_REVIEW.text,
      userReviewRating: EMPTY_REVIEW.rating,
      userReviewOfferID: EMPTY_REVIEW.offerID,
    }, {
      type: ActionType.USER_REVIEW_TEXT,
      payload: `review text`
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: `email`,
      userReviewText: `review text`,
      userReviewRating: EMPTY_REVIEW.rating,
      userReviewOfferID: EMPTY_REVIEW.offerID,
    });
  });

  it(`should change an "userReviewRating" status by payload`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: `email`,
      userReviewText: EMPTY_REVIEW.text,
      userReviewRating: EMPTY_REVIEW.rating,
      userReviewOfferID: EMPTY_REVIEW.offerID,
    }, {
      type: ActionType.USER_REVIEW_RATING,
      payload: 5
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: `email`,
      userReviewText: EMPTY_REVIEW.text,
      userReviewRating: 5,
      userReviewOfferID: EMPTY_REVIEW.offerID,
    });
  });

  it(`should change an "userReviewOfferID" status by payload`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: `email`,
      userReviewText: EMPTY_REVIEW.text,
      userReviewRating: EMPTY_REVIEW.rating,
      userReviewOfferID: EMPTY_REVIEW.offerID,
    }, {
      type: ActionType.USER_REVIEW_OFFER_ID,
      payload: `11`
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: `email`,
      userReviewText: EMPTY_REVIEW.text,
      userReviewRating: EMPTY_REVIEW.rating,
      userReviewOfferID: `11`,
    });
  });

  it(`should reset an user review state`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: `email`,
      userReviewText: `EMPTY_REVIEW.text`,
      userReviewRating: `EMPTY_REVIEW.rating`,
      userReviewOfferID: `EMPTY_REVIEW.offerID`,
    }, {
      type: ActionType.RESET_USER_REVIEW,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: `email`,
      userReviewText: EMPTY_REVIEW.text,
      userReviewRating: EMPTY_REVIEW.rating,
      userReviewOfferID: EMPTY_REVIEW.offerID,
    });
  });
});
