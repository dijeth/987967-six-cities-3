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

  it(`should change an activeCity by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      loading: 0,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `London`
    })).toEqual({
      activeCity: `London`,
      activeOffer: null,
      loading: 0,
      sortType: SortType.POPULAR
    });
  });

  it(`should change an activeOffer by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      loading: 0,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: `A new offer`
    })).toEqual({
      activeCity: null,
      activeOffer: `A new offer`,
      loading: 0,
      sortType: SortType.POPULAR
    });
  });

  it(`should increment a "loading" by 1`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      loading: 0,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.INCREASE_LOAD
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      loading: 1,
      sortType: SortType.POPULAR
    });
  });

  it(`should decrement a "loading" by 1`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      loading: 1,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.DECREASE_LOAD
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      loading: 0,
      sortType: SortType.POPULAR
    });
  });

  it(`should change a sortType by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      loading: 0,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.PRICE_LOW_TO_HIGH
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      loading: 0,
      sortType: SortType.PRICE_LOW_TO_HIGH
    });
  });
});
