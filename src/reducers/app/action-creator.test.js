import ActionType from '../action-type.js';
import ActionCreator from './action-creator.js';

describe(`App ActionCreator Test`, () => {

  it(`should return a correct action for "changeCity"`, () => {
    expect(ActionCreator.changeCity(`city`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `city`
    });
  });

  it(`should return a correct action for "changeActiveOffer"`, () => {
    expect(ActionCreator.changeActiveOffer(`city`)).toEqual({
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: `city`
    });
  });

  it(`should return a correct action for "changeSortType"`, () => {
    expect(ActionCreator.changeSortType(`SortType`)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `SortType`
    });
  });

  it(`should return a correct action for "increaseLoad"`, () => {
    expect(ActionCreator.increaseLoad()).toEqual({
      type: ActionType.INCREASE_LOAD,
    });
  });

  it(`should return a correct action for "decreaseLoad"`, () => {
    expect(ActionCreator.decreaseLoad()).toEqual({
      type: ActionType.DECREASE_LOAD,
    });
  });

  it(`should return a correct action for "changeCommentSendingStatus"`, () => {
    expect(ActionCreator.changeCommentSendingStatus(true)).toEqual({
      type: ActionType.CHANGE_COMMENT_SENDING_STATUS,
      payload: true
    });
  });

  it(`should return a correct action for "setPageError"`, () => {
    expect(ActionCreator.setPageError(`Server error`)).toEqual({
      type: ActionType.SET_PAGE_ERROR,
      payload: `Server error`
    });
  });
});
