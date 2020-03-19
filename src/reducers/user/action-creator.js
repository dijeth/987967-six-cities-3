import ActionType from '../action-type.js';

const ActionCreator = {
  changeAuthorizationStatus: (payload) => ({type: ActionType.CHANGE_AUTH_STATUS, payload}),
  changeAuthInfo: (payload) => ({type: ActionType.CHANGE_AUTH_INFO, payload}),
  resetUserReview: () => ({type: ActionType.RESET_USER_REVIEW}),
  userReviewText: (payload) => ({type: ActionType.USER_REVIEW_TEXT, payload}),
  userReviewRating: (payload) => ({type: ActionType.USER_REVIEW_RATING, payload}),
  userReviewOfferID: (payload) => ({type: ActionType.USER_REVIEW_OFFER_ID, payload}),
};

export default ActionCreator;
