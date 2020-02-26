import ActionCreator from './action-creator.js';
import ActionType from './action-type.js';
import {ScreenType} from './const.js';

describe(`Test ActionCreator`, () => {
  it(`ActionCreator.changeCity should return a right action`, () => {
    expect(ActionCreator.changeCity(1)).toEqual({type: ActionType.CHANGE_CITY, payload: 1});
  });

  it(`ActionCreator.selectOffe should return a right actionrs`, () => {
    expect(ActionCreator.selectOffers()).toEqual({type: ActionType.SELECT_OFFERS});
  });

  it(`ActionCreator.changeActi should return a right actionveCard`, () => {
    expect(ActionCreator.changeActiveCard(`offer`)).toEqual({type: ActionType.CHANGE_ACTIVE_CARD, payload: `offer`});
  });

  it(`ActionCreator.changeScre should return a right actionenType`, () => {
    expect(ActionCreator.changeScreenType(ScreenType.MAIN)).toEqual({
      type: ActionType.CHANGE_SCREEN_TYPE,
      payload: ScreenType.MAIN
    });
  });
});
