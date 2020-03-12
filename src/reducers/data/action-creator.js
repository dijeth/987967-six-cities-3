import ActionType from '../action-type.js';

const ActionCreator = {
  loadOffers: (offers) => ({type: ActionType.LOAD_OFFERS, payload: offers}),
  loadCities: (cities) => ({type: ActionType.LOAD_CITIES, payload: cities})
};

export default ActionCreator;
