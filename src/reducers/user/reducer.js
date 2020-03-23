import ActionType from '../action-type.js';
import {AuthorizationStatus, EMPTY_REVIEW} from '../../const/const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: null,
  userReviewText: EMPTY_REVIEW.text,
  userReviewRating: EMPTY_REVIEW.rating,
  userReviewOfferID: EMPTY_REVIEW.offerID,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTH_STATUS:
      return Object.assign({}, state, {authorizationStatus: action.payload});

    case ActionType.CHANGE_AUTH_INFO:
      return Object.assign({}, state, {authInfo: action.payload});

    case ActionType.RESET_USER_REVIEW:
      return Object.assign({},
          state, {
            userReviewText: EMPTY_REVIEW.text,
            userReviewRating: EMPTY_REVIEW.rating,
            userReviewOfferID: EMPTY_REVIEW.offerID,
          });

    case ActionType.USER_REVIEW_TEXT:
      return Object.assign({}, state, {userReviewText: action.payload});

    case ActionType.USER_REVIEW_RATING:
      return Object.assign({}, state, {userReviewRating: action.payload});

    case ActionType.USER_REVIEW_OFFER_ID:
      return Object.assign({}, state, {userReviewOfferID: action.payload});
  }

  return state;
};

export default reducer;
