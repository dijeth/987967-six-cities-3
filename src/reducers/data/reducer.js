import ActionType from '../action-type.js';

const initialState = {
  cities: [],
  offers: [],
	nearbyList: [],
	comments: [],  
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
  }

  return state;
};

export default reducer;
