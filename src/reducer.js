import { offerMocks } from './mocks/offers.js';
import { getCities, getOffers } from './util.js';

const cities = getCities(offerMocks);

// Вынести offers из story???
// А если офферов нет и список городов пуст activeCity = 0 --- ???

const initialState = {
	cities: cities,
  activeCity: 0,
  offers: offerMocks,
  selectedOffers: getOffers(cities[0], offerMocks),
  activeCard: null
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SELECT_OFFERS: `SELECT_OFFERS`,
  CHANGE_ACTIVE_CARD: `CHANGE_ACTIVE_CARD`
};

const ActionCreator = {
  changeCity: (cityIndex) => ({ type: ActionType.CHANGE_CITY, payload: cityIndex }),
  selectOffers: () => ({ type: ActionType.SELECT_OFFERS }),
  changeActiveCard: (offer) => ({type: ActionType.CHANGE_ACTIVE_CARD, payload: offer})
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, { activeCity: action.payload })

    case ActionType.SELECT_OFFERS:
      return Object.assign({}, state, { selectedOffers: getOffers(state.cities[state.activeCity], state.offers) })

    case ActionType.CHANGE_ACTIVE_CARD:
      return Object.assign({}, state, { activeCard: activeCity.payload })
  };

  return state;
};

export {reducer, ActionCreator};