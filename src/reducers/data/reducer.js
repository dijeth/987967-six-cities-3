import ActionType from '../action-type.js';

const initialState = {
  cities: [],
  offers: [],
  nearbyList: [],
  comments: [],
  favorites: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {offers: action.payload});

    case ActionType.LOAD_CITIES:
      return Object.assign({}, state, {cities: action.payload});

    case ActionType.LOAD_NEARBY:
      return Object.assign({}, state, {nearbyList: action.payload});

    case ActionType.LOAD_COMMENTS:
      return Object.assign({}, state, {comments: action.payload});

    case ActionType.LOAD_FAVORITES:
      return Object.assign({}, state, {favorites: action.payload});

    case ActionType.REPLACE_OFFER:
      const offers = state.offers;
      const index = offers.findIndex((it) => it.id === action.payload.id);
      const length = offers.length;

      const offersLeft = index === 0 ? [] : offers.slice(0, index);
      const offersRight = index === length - 1 ? [] : offers.slice(index + 1, length);

      return Object.assign({}, state, {offers: offersLeft.concat(action.payload).concat(offersRight)});
  }

  return state;
};

export default reducer;
