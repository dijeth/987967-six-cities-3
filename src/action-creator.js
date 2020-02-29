import ActionType from './action-type.js';

const ActionCreator = {
  changeCity: (cityIndex) => ({type: ActionType.CHANGE_CITY, payload: cityIndex}),
  changeActiveOffer: (offer) => ({type: ActionType.CHANGE_ACTIVE_OFFER, payload: offer}),
  changeScreenType: (screenType) => ({type: ActionType.CHANGE_SCREEN_TYPE, payload: screenType}),
  changeSortType: (sortType) => ({type: ActionType.CHANGE_SORT_TYPE, payload: sortType}),
};

export default ActionCreator;
