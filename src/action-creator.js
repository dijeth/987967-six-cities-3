import ActionType from './action-type.js';

const ActionCreator = {
  changeCity: (cityIndex) => ({type: ActionType.CHANGE_CITY, payload: cityIndex}),
  selectOffers: () => ({type: ActionType.SELECT_OFFERS}),
  changeActiveCard: (offer) => ({type: ActionType.CHANGE_ACTIVE_CARD, payload: offer}),
  changeScreenType: (screenType) => ({type: ActionType.CHANGE_SCREEN_TYPE, payload: screenType}),
  changeSortType: (sortType) => ({type: ActionType.CHANGE_SORT_TYPE, payload: sortType}),
  sortOffers: () => ({type: ActionType.SORT_OFFERS}),
};

export default ActionCreator;
