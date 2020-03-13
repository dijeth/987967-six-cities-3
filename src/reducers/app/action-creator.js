import ActionType from '../action-type.js';

const ActionCreator = {
  changeCity: (city) => ({type: ActionType.CHANGE_CITY, payload: city}),
  changeActiveOffer: (offer) => ({type: ActionType.CHANGE_ACTIVE_OFFER, payload: offer}),
  changeSortType: (sortType) => ({type: ActionType.CHANGE_SORT_TYPE, payload: sortType}),
  changeLoadingStatus: (isLoading) => ({type: ActionType.CHANGE_LOADING_STATUS, payload: isLoading}),
  changeCommentSendingStatus: (isCommentSending) => ({type: ActionType.CHANGE_COMMENT_SENDING_STATUS, payload: isCommentSending}),
  setCommentError: (errorText) => ({type: ActionType.SET_COMMENT_ERROR, payload: errorText}),
};

export default ActionCreator;
