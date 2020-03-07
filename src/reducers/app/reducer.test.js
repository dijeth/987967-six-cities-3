import reducer from './reducer.js';
import ActionType from '../action-type.js';
import {ScreenType, SortType} from '../../const/const.js';

const initialState = {
  activeCity: null,
  activeOffer: null,
  screenType: ScreenType.MAIN,
  sortType: SortType.POPULAR
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
      screenType: ScreenType.MAIN,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `London`
    })).toEqual({
      activeCity: `London`,
      activeOffer: null,
      screenType: ScreenType.MAIN,
      sortType: SortType.POPULAR
    });
  });

  it(`should change an activeOffer by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      screenType: ScreenType.MAIN,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: `A new offer`
    })).toEqual({
      activeCity: null,
      activeOffer: `A new offer`,
      screenType: ScreenType.MAIN,
      sortType: SortType.POPULAR
    });
  });

  it(`should change a screenType by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      screenType: ScreenType.MAIN,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_SCREEN_TYPE,
      payload: ScreenType.PROPERTY
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      screenType: ScreenType.PROPERTY,
      sortType: SortType.POPULAR
    });
  });

  it(`should change a sortType by payload`, () => {
    expect(reducer({
      activeCity: null,
      activeOffer: null,
      screenType: ScreenType.MAIN,
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.PRICE_LOW_TO_HIGH
    })).toEqual({
      activeCity: null,
      activeOffer: null,
      screenType: ScreenType.MAIN,
      sortType: SortType.PRICE_LOW_TO_HIGH
    });
  });
});
