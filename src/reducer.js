import { offerMocks } from './mocks/offers.js';
import { getCities, getOffers } from './util.js';
import { ScreenType } from './const.js';

const cities = getCities(offerMocks);

// Вынести offers из story???
// А если офферов нет и список городов пуст activeCity = 0 --- ???

const initialState = {
	cities: cities,
  activeCity: 0,
  selectedOffers: getOffers(cities[0], offerMocks),
  activeCard: null,
  screenType: ScreenType.MAIN
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SELECT_OFFERS: `SELECT_OFFERS`,
  CHANGE_ACTIVE_CARD: `CHANGE_ACTIVE_CARD`,
  CHANGE_SCREEN_TYPE: `CHANGE_SCREEN_TYPE`
};

const ActionCreator = {
  changeCity: (cityIndex) => ({ type: ActionType.CHANGE_CITY, payload: cityIndex }),
  selectOffers: () => ({ type: ActionType.SELECT_OFFERS }),
  changeActiveCard: (offer) => ({type: ActionType.CHANGE_ACTIVE_CARD, payload: offer}),
  changeScreenType: (screenType) => ({type: ActionType.CHANGE_SCREEN_TYPE, payload: screenType})
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, { activeCity: action.payload })

    case ActionType.SELECT_OFFERS:
      return Object.assign({}, state, { selectedOffers: getOffers(state.cities[state.activeCity], offerMocks) })

    case ActionType.CHANGE_ACTIVE_CARD:
      return Object.assign({}, state, { activeCard: action.payload })

    case ActionType.CHANGE_SCREEN_TYPE:
      return Object.assign({}, state, { screenType: action.payload })
  };

  return state;
};

export {reducer, ActionCreator};