import {SortType} from '../../const/const.js';
import ActionType from '../action-type.js';

const initialState = {
  activeCity: null,
  activeOffer: null,
  sortType: SortType.POPULAR,
  loading: 0,
  isCommentSending: false,
  commentError: false,
  pageError: ``
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {activeCity: action.payload});

    case ActionType.CHANGE_ACTIVE_OFFER:
      return Object.assign({}, state, {activeOffer: action.payload});

    case ActionType.CHANGE_SORT_TYPE:
      return Object.assign({}, state, {sortType: action.payload});

    case ActionType.INCREASE_LOAD:
      return Object.assign({}, state, {loading: state.loading+1});

    case ActionType.DECREASE_LOAD:
      return Object.assign({}, state, {loading: state.loading-1});

    case ActionType.CHANGE_COMMENT_SENDING_STATUS:
      return Object.assign({}, state, {isCommentSending: action.payload});

    case ActionType.SET_COMMENT_ERROR:
      return Object.assign({}, state, {commentError: action.payload});

    case ActionType.SET_PAGE_ERROR:
      return Object.assign({}, state, {pageError: action.payload});
  }

  return state;
};

export default reducer;
