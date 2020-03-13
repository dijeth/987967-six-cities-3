import {SortType} from '../../const/const.js';
import ActionType from '../action-type.js';

const initialState = {
  activeCity: null,
  activeOffer: null,
  sortType: SortType.POPULAR,
  isLoading: false,
  isCommentSending: false,
  commentError: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {activeCity: action.payload});

    case ActionType.CHANGE_ACTIVE_OFFER:
      return Object.assign({}, state, {activeOffer: action.payload});

    case ActionType.CHANGE_SORT_TYPE:
      return Object.assign({}, state, {sortType: action.payload});

    case ActionType.CHANGE_LOADING_STATUS:
      return Object.assign({}, state, {isLoading: action.payload});

    case ActionType.CHANGE_COMMENT_SENDING_STATUS:
      return Object.assign({}, state, {isCommentSending: action.payload});

    case ActionType.SET_COMMENT_ERROR:
      return Object.assign({}, state, {commentError: action.payload});
  }

  return state;
};

export default reducer;
