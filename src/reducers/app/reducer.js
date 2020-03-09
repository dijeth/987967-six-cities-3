import {ScreenType, SortType} from '../../const/const.js';
import ActionType from '../action-type.js';

const initialState = {
  activeCity: null,
  activeOffer: null,
  screenType: ScreenType.MAIN,
  sortType: SortType.POPULAR,
  isLoading: false
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

    case ActionType.CHANGE_LOADING_STATUS:
      return Object.assign({}, state, {isLoading: action.payload});
  }

  return state;
};

export default reducer;
