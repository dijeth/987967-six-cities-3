import ActionType from '../action-type.js';
import ActionCreator from './action-creator.js';

describe(`Data ActionCreator Test`, () => {

  it(`should return a correct action for "loadOffers"`, () => {
    expect(ActionCreator.loadOffers(`offers`)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: `offers`
    });
  });

  it(`should return a correct action for "loadCities"`, () => {
    expect(ActionCreator.loadCities(`cities`)).toEqual({
      type: ActionType.LOAD_CITIES,
      payload: `cities`
    });
  });

  it(`should return a correct action for "loadNearby"`, () => {
    expect(ActionCreator.loadNearby(`nearby`)).toEqual({
      type: ActionType.LOAD_NEARBY,
      payload: `nearby`
    });
  });

  it(`should return a correct action for "loadComments"`, () => {
    expect(ActionCreator.loadComments(`comments`)).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: `comments`
    });
  });

  it(`should return a correct action for "replaceOffer"`, () => {
    expect(ActionCreator.replaceOffer(`offer`)).toEqual({
      type: ActionType.REPLACE_OFFER,
      payload: `offer`
    });
  });

});
