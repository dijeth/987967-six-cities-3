import NameSpace from '../name-space.js';
import {AuthorizationStatus, EMPTY_REVIEW} from '../../const/const.js';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus === AuthorizationStatus.AUTH;
export const getUserPicture = (state) => state[NameSpace.USER].authInfo && state[NameSpace.USER].authInfo.userPic;
export const getEmail = (state) => state[NameSpace.USER].authInfo && state[NameSpace.USER].authInfo.email;
export const getIsUserSuper = (state) => state[NameSpace.USER].authInfo && state[NameSpace.USER].authInfo.isSuperUser;

export const getUserReviewText = (state) => state[NameSpace.USER].userReviewText || EMPTY_REVIEW.text;
export const getUserReviewRating = (state) => state[NameSpace.USER].userReviewRating || EMPTY_REVIEW.rating;
export const getUserReviewOfferID = (state) => state[NameSpace.USER].userReviewOfferID || EMPTY_REVIEW.offerID;

export const getUserReview = (state) => ({
	text: getUserReviewText(state),
	rating: getUserReviewRating(state),
	offerID: getUserReviewOfferID(state),
})
