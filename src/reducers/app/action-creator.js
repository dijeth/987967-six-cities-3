import ActionType from '../action-type.js';

const ActionCreator = {
  changeCity: (city) => ({type: ActionType.CHANGE_CITY, payload: city}),
  changeActiveOffer: (offer) => ({type: ActionType.CHANGE_ACTIVE_OFFER, payload: offer}),
  changeSortType: (sortType) => ({type: ActionType.CHANGE_SORT_TYPE, payload: sortType}),
  increaseLoad: () => ({type: ActionType.INCREASE_LOAD}),
  decreaseLoad: () => ({type: ActionType.DECREASE_LOAD}),
  changeCommentSendingStatus: (isCommentSending) => ({type: ActionType.CHANGE_COMMENT_SENDING_STATUS, payload: isCommentSending}),
  setCommentError: (isError) => ({type: ActionType.SET_COMMENT_ERROR, payload: isError}),
  setPageError: (errorText) => ({type: ActionType.SET_PAGE_ERROR, payload: errorText}),
};

export default ActionCreator;
