import ActionType from '../action-type.js';

const initialState = {
  cities: [],
  offers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {offers: action.payload});

    case ActionType.LOAD_CITIES:
      return Object.assign({}, state, {cities: action.payload});
  }

  return state;
};

export default reducer;
