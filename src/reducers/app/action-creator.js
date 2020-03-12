import ActionType from '../action-type.js';

const ActionCreator = {
  changeCity: (city) => ({type: ActionType.CHANGE_CITY, payload: city}),
  changeActiveOffer: (offer) => ({type: ActionType.CHANGE_ACTIVE_OFFER, payload: offer}),
  changeSortType: (sortType) => ({type: ActionType.CHANGE_SORT_TYPE, payload: sortType}),
  changeLoadingStatus: (isLoading) => ({type: ActionType.CHANGE_LOADING_STATUS, payload: isLoading}),
};

export default ActionCreator;
