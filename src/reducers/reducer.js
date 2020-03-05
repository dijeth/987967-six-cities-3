import {offerMocks} from '../mocks/offers.js';
import {getCities} from '../util.js';
import {ScreenType, SortType} from '../const/const.js';
import ActionType from './action-type.js';

// const cities = getCities(offerMocks);

const initialState = {
  cities: [],
  offers: [],
  // offers: offerMocks,
  activeCity: null,
  activeOffer: null,
  screenType: ScreenType.MAIN,
  sortType: SortType.POPULAR
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {activeCity: action.payload});

    case ActionType.CHANGE_ACTIVE_OFFER:
      return Object.assign({}, state, {activeOffer: action.payload});

    case ActionType.CHANGE_SCREEN_TYPE:
      return Object.assign({}, state, {screenType: action.payload});

    case ActionType.CHANGE_SORT_TYPE:
      return Object.assign({}, state, {sortType: action.payload});

    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {offers: action.payload});

    case ActionType.LOAD_CITIES:
      return Object.assign({}, state, {cities: action.payload});
  }

  return state;
};

export default reducer;
export {initialState};
