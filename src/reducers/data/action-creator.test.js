import ActionType from '../action-type.js';
import ActionCreator from './action-creator.js';

describe(`Data ActionCreator Test`, () => {

  it(`should return a correct action for loadOffers`, () => {
    expect(ActionCreator.loadOffers(`offers`)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: `offers`
    });
  });

  it(`should return a correct action for loadCities`, () => {
    expect(ActionCreator.loadCities(`cities`)).toEqual({
      type: ActionType.LOAD_CITIES,
      payload: `cities`
    });
  });
});
