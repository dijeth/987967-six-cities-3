import reducer from './reducer.js';
import ActionType from '../action-type.js';

const initialState = {
  cities: [],
  offers: [],
  nearbyList: [],
  comments: [],
};

describe(`Test App reducer`, () => {
  it(`should return initialState when called with an unknown action`, () => {
    expect(reducer(undefined, {type: undefined}))
      .toEqual(initialState);
  });

  it(`should change cities by payload`, () => {
    expect(reducer({
      cities: [],
      offers: [],
    }, {
      type: ActionType.LOAD_CITIES,
      payload: [`city-1`, `city-2`, `city-3`]
    })).toEqual({
      cities: [`city-1`, `city-2`, `city-3`],
      offers: [],
    });
  });

  it(`should change offers by payload`, () => {
    expect(reducer({
      cities: [],
      offers: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: [`offer-1`, `offer-2`, `offer-3`]
    })).toEqual({
      cities: [],
      offers: [`offer-1`, `offer-2`, `offer-3`],
    });
  });
});
