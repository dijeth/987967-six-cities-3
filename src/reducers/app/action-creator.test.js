import ActionType from '../action-type.js';
import ActionCreator from './action-creator.js';

describe(`App ActionCreator Test`, () => {

  it(`should return a correct action for changeCity`, () => {
    expect(ActionCreator.changeCity(`city`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `city`
    });
  });

  it(`should return a correct action for changeActiveOffer`, () => {
    expect(ActionCreator.changeActiveOffer(`offer`)).toEqual({
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: `offer`
    });
  });

  it(`should return a correct action for changeScreenType`, () => {
    expect(ActionCreator.changeScreenType(`screenType`)).toEqual({
      type: ActionType.CHANGE_SCREEN_TYPE,
      payload: `screenType`
    });
  });

  it(`should return a correct action for changeSortType`, () => {
    expect(ActionCreator.changeSortType(`sortType`)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `sortType`
    });
  });
});
