import reducer from './reducer.js';
import ActionType from '../action-type.js';
import {SortType} from '../../const/const.js';

const initialState = {
  activeCity: null,
  activeOffer: null,
  sortType: SortType.POPULAR,
  loading: 0,
  isCommentSending: false,
  commentError: false,
  pageError: ``
};

describe(`Test App reducer`, () => {
  it(`should return initialState when called with an unknown action`, () => {
    expect(reducer(undefined, {type: undefined}))
      .toEqual(initialState);
  });

  it(`should change an "activeCity" by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `London`
    })).toEqual({
      activeCity: `London`,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    });
  });

  it(`should change an "activeOffer" by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    }, {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: `Offer`
    })).toEqual({
      activeCity: null,
      activeOffer: `Offer`,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    });
  });

  it(`should change an "sortType" by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    }, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `SortType`
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      sortType: `SortType`,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    });
  });

  it(`should increment an "loading" by 1`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    }, {
      type: ActionType.INCREASE_LOAD,
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 1,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    });
  });

  it(`should decrement an "loading" by 1`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 1,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    }, {
      type: ActionType.DECREASE_LOAD,
      payload: `London`
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    });
  });

  it(`should change an "isCommentSending" by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    }, {
      type: ActionType.CHANGE_COMMENT_SENDING_STATUS,
      payload: true
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: true,
      commentError: false,
      pageError: ``
    });
  });

  it(`should change an "commentError" by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    }, {
      type: ActionType.SET_COMMENT_ERROR,
      payload: true
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: true,
      pageError: ``
    });
  });

  it(`should change an "pageError" by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: ``
    }, {
      type: ActionType.SET_PAGE_ERROR,
      payload: `Server error`
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      sortType: SortType.POPULAR,
      loading: 0,
      isCommentSending: false,
      commentError: false,
      pageError: `Server error`
    });
  });
});
