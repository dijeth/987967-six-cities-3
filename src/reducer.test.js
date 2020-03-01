import reducer, {initialState} from './reducer.js';
import ActionType from './action-type.js';
import {ScreenType, SortType} from './const.js';

describe(`Test reducer`, () => {
  it(`should return initialState when called with an unknown action`, () => {
    expect(reducer(undefined, {type: undefined})).toEqual(initialState);
  });

  it(`should change an activeCity by payload`, () => {
    expect(reducer({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 0,
      selectedOffers: [`offer`],
      activeOffer: null,
      screenType: ScreenType.MAIN
    }, {
      type: ActionType.CHANGE_CITY,
      payload: 1
    })).toEqual({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 1,
      selectedOffers: [`offer`],
      activeOffer: null,
      screenType: ScreenType.MAIN
    });
  });

  it(`should change an activeOffer by payload`, () => {
    expect(reducer({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 0,
      selectedOffers: [`offer`],
      activeOffer: null,
      screenType: ScreenType.MAIN
    }, {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: `offer2`
    })).toEqual({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 0,
      selectedOffers: [`offer`],
      activeOffer: `offer2`,
      screenType: ScreenType.MAIN
    });
  });

  it(`should change a screenType by payload`, () => {
    expect(reducer({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 0,
      selectedOffers: [`offer`],
      activeOffer: null,
      screenType: ScreenType.MAIN
    }, {
      type: ActionType.CHANGE_SCREEN_TYPE,
      payload: ScreenType.PROPERTY
    })).toEqual({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 0,
      selectedOffers: [`offer`],
      activeOffer: null,
      screenType: ScreenType.PROPERTY
    });
  });

  it(`should change a sortType by payload`, () => {
    expect(reducer({
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.PRICE_LOW_TO_HIGH
    })).toEqual({
      sortType: SortType.PRICE_LOW_TO_HIGH
    });
  });
});
