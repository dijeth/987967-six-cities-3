import ActionCreator from './action-creator.js';
import ActionType from './action-type.js';
import {ScreenType, SortType} from './const.js';

describe(`Test ActionCreator`, () => {
  it(`ActionCreator.changeCity should return a right action`, () => {
    expect(ActionCreator.changeCity(1)).toEqual({type: ActionType.CHANGE_CITY, payload: 1});
  });

  it(`ActionCreator.selectOffers should return a right action`, () => {
    expect(ActionCreator.selectOffers()).toEqual({type: ActionType.SELECT_OFFERS});
  });

  it(`ActionCreator.changeActiveOffer should return a right action`, () => {
    expect(ActionCreator.changeActiveOffer(`offer`)).toEqual({type: ActionType.CHANGE_ACTIVE_OFFER, payload: `offer`});
  });

  it(`ActionCreator.changeScreenType should return a right action`, () => {
    expect(ActionCreator.changeScreenType(ScreenType.MAIN)).toEqual({
      type: ActionType.CHANGE_SCREEN_TYPE,
      payload: ScreenType.MAIN
    });
  });

  it(`ActionCreator.changeSortType should return a right action`, () => {
    expect(ActionCreator.changeSortType(SortType.POPULAR)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.POPULAR
    });
  });

  it(`ActionCreator.sortOffers should return a right action`, () => {
    expect(ActionCreator.sortOffers()).toEqual({
      type: ActionType.SORT_OFFERS
    });
  });
});
