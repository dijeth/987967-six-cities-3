import {offerMocks} from './mocks/offers.js';
import {getCities, getOffers, sortOffers} from './util.js';
import {ScreenType, SortType, SORT_LIST} from './const.js';
import ActionType from './action-type.js';

const cities = getCities(offerMocks);

const initialState = {
  cities,
  offers: offerMocks,
  activeCity: 0,
  selectedOffers: getOffers(cities[0], offerMocks),
  activeCard: null,
  screenType: ScreenType.MAIN,
  sortType: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {activeCity: action.payload});

    case ActionType.SELECT_OFFERS:
      return Object.assign({}, state, {
        selectedOffers: getOffers(state.cities[state.activeCity], state.offers)
      });

    case ActionType.CHANGE_ACTIVE_CARD:
      return Object.assign({}, state, {activeCard: state.selectedOffers[action.payload]});

    case ActionType.CHANGE_SCREEN_TYPE:
      return Object.assign({}, state, {screenType: action.payload});

    case ActionType.CHANGE_SORT_TYPE:
      return Object.assign({}, state, {sortType: action.payload});

    case ActionType.SORT_OFFERS:
      const offers = getOffers(state.cities[state.activeCity], state.offers);
      return Object.assign({}, state, {
        selectedOffers: sortOffers(offers, SORT_LIST[state.sortType])
      });
  }

  return state;
};

export default reducer;
export {initialState};
