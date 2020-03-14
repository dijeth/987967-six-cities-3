import ActionType from '../action-type.js';

const ActionCreator = {
  loadOffers: (offers) => ({type: ActionType.LOAD_OFFERS, payload: offers}),
  loadCities: (cities) => ({type: ActionType.LOAD_CITIES, payload: cities}),
  loadNearby: (nearbyList) => ({type: ActionType.LOAD_NEARBY, payload: nearbyList}),
  loadComments: (comments) => ({type: ActionType.LOAD_COMMENTS, payload: comments}),
};

export default ActionCreator;
