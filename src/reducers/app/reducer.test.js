import reducer from './reducer.js';
import ActionType from '../action-type.js';
import {SortType} from '../../const/const.js';

const initialState = {
  activeCity: null,
  activeOffer: null,
  sortType: SortType.POPULAR,
  isLoading: false
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
      isLoading: false,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `London`
    })).toEqual({
      activeCity: `London`,
      activeOffer: null,
      isLoading: false,
      sortType: SortType.POPULAR
    });
  });

  it(`should change an activeOffer by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      isLoading: false,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: `A new offer`
    })).toEqual({
      activeCity: null,
      activeOffer: `A new offer`,
      isLoading: false,
      sortType: SortType.POPULAR
    });
  });

  it(`should change a isLoading by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      isLoading: false,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_LOADING_STATUS,
      payload: true
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      isLoading: true,
      sortType: SortType.POPULAR
    });
  });

  it(`should change a sortType by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      isLoading: false,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.PRICE_LOW_TO_HIGH
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      isLoading: false,
      sortType: SortType.PRICE_LOW_TO_HIGH
    });
  });
});
