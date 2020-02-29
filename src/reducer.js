import {offerMocks} from './mocks/offers.js';
import {getCities, getOffers, sortOffers} from './util.js';
import {ScreenType, SortType, SORT_LIST} from './const.js';
import ActionType from './action-type.js';

const cities = getCities(offerMocks);

const initialState = {
  cities,
  offers: offerMocks,
  activeCity: 0,
  activeOffer: null,
  screenType: ScreenType.MAIN,
  sortType: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {activeCity: action.payload});

    case ActionType.CHANGE_ACTIVE_OFFER:
      return Object.assign({}, state, {activeOffer: state.offers[action.payload]});

    case ActionType.CHANGE_SCREEN_TYPE:
      return Object.assign({}, state, {screenType: action.payload});

    case ActionType.CHANGE_SORT_TYPE:
      return Object.assign({}, state, {sortType: action.payload});
  }

  return state;
};

export default reducer;
export {initialState};
