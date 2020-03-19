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

  it(`should change "offers" by payload`, () => {
    expect(reducer({
      cities: [],
      offers: [],
      nearbyList: [],
      comments: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: [`offer-1`, `offer-2`, `offer-3`]
    })).toEqual({
      cities: [],
      offers: [`offer-1`, `offer-2`, `offer-3`],
      nearbyList: [],
      comments: [],
    });
  });

  it(`should change "cities" by payload`, () => {
    expect(reducer({
      cities: [],
      offers: [],
      nearbyList: [],
      comments: [],
    }, {
      type: ActionType.LOAD_CITIES,
      payload: [`city-1`, `city-2`, `city-3`]
    })).toEqual({
      cities: [`city-1`, `city-2`, `city-3`],
      offers: [],
      nearbyList: [],
      comments: [],
    });
  });

  it(`should change "nearbyList" by payload`, () => {
    expect(reducer({
      cities: [],
      offers: [],
      nearbyList: [],
      comments: [],
    }, {
      type: ActionType.LOAD_NEARBY,
      payload: [`near-offer-1`, `near-offer-2`, `near-offer-3`]
    })).toEqual({
      cities: [],
      offers: [],
      nearbyList: [`near-offer-1`, `near-offer-2`, `near-offer-3`],
      comments: [],
    });
  });

  it(`should change "comments" by payload`, () => {
    expect(reducer({
      cities: [],
      offers: [],
      nearbyList: [],
      comments: [],
    }, {
      type: ActionType.LOAD_COMMENTS,
      payload: [`comment-1`, `comment-2`, `comment-3`]
    })).toEqual({
      cities: [],
      offers: [],
      nearbyList: [],
      comments: [`comment-1`, `comment-2`, `comment-3`],
    });
  });

  it(`should replace offer by payload`, () => {
    expect(reducer({
      cities: [],
      offers: [{id: `1`, title: `title-1`}, {id: `2`, title: `title-2`}, {id: `3`, title: `title-3`}],
      nearbyList: [],
      comments: [],
    }, {
      type: ActionType.REPLACE_OFFER,
      payload: {id: `2`, title: `title-22`}
    })).toEqual({
      cities: [],
      offers: [{id: `1`, title: `title-1`}, {id: `2`, title: `title-22`}, {id: `3`, title: `title-3`}],
      nearbyList: [],
      comments: [],
    });
  });

  it(`should replace offer by payload when offer is first`, () => {
    expect(reducer({
      cities: [],
      offers: [{id: `1`, title: `title-1`}, {id: `2`, title: `title-2`}, {id: `3`, title: `title-3`}],
      nearbyList: [],
      comments: [],
    }, {
      type: ActionType.REPLACE_OFFER,
      payload: {id: `1`, title: `title-11`}
    })).toEqual({
      cities: [],
      offers: [{id: `1`, title: `title-11`}, {id: `2`, title: `title-2`}, {id: `3`, title: `title-3`}],
      nearbyList: [],
      comments: [],
    });
  });

  it(`should replace offer by payload when offer is last`, () => {
    expect(reducer({
      cities: [],
      offers: [{id: `1`, title: `title-1`}, {id: `2`, title: `title-2`}, {id: `3`, title: `title-3`}],
      nearbyList: [],
      comments: [],
    }, {
      type: ActionType.REPLACE_OFFER,
      payload: {id: `3`, title: `title-33`}
    })).toEqual({
      cities: [],
      offers: [{id: `1`, title: `title-1`}, {id: `2`, title: `title-2`}, {id: `3`, title: `title-33`}],
      nearbyList: [],
      comments: [],
    });
  });
});
