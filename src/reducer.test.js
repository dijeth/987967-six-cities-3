import { reducer, ActionCreator, initialState, ActionType } from './reducer.js';
import { ScreenType } from './const.js';

describe(`Test reducer`, () => {
  it(`should return initialState when called with an unknown action`, () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it(`should change an activeCity by payload`, () => {
    expect(reducer({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 0,
      selectedOffers: [`offer`],
      activeCard: null,
      screenType: ScreenType.MAIN
    }, {
      type: ActionType.CHANGE_CITY,
      payload: 1
    })).toEqual({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 1,
      selectedOffers: [`offer`],
      activeCard: null,
      screenType: ScreenType.MAIN
    })
  });

  it(`should change an activeCard by payload`, () => {
    expect(reducer({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 0,
      selectedOffers: [`offer`],
      activeCard: null,
      screenType: ScreenType.MAIN
    }, {
      type: ActionType.CHANGE_ACTIVE_CARD,
      payload: `offer2`
    })).toEqual({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 0,
      selectedOffers: [`offer`],
      activeCard: `offer2`,
      screenType: ScreenType.MAIN
    })
  });

  it(`should select offers by state.activeCity`, () => {
    expect(reducer({
      cities: [`city1`, `city2`],
      offers: [{
          id: 1,
          city: `city1`
        },
        {
          id: 2,
          city: `city1`
        },
        {
          id: 3,
          city: `city2`
        },
        {
          id: 4,
          city: `city1`
        },
        {
          id: 5,
          city: `city1`
        },
        {
          id: 6,
          city: `city2`
        },
        {
          id: 7,
          city: `city1`
        },
        {
          id: 8,
          city: `city2`
        }
      ],
      activeCity: 1,
      selectedOffers: [`offer`],
      activeCard: null,
      screenType: ScreenType.MAIN
    }, {
      type: ActionType.SELECT_OFFERS
    })).toEqual({
      cities: [`city1`, `city2`],
      offers: [{
          id: 1,
          city: `city1`
        },
        {
          id: 2,
          city: `city1`
        },
        {
          id: 3,
          city: `city2`
        },
        {
          id: 4,
          city: `city1`
        },
        {
          id: 5,
          city: `city1`
        },
        {
          id: 6,
          city: `city2`
        },
        {
          id: 7,
          city: `city1`
        },
        {
          id: 8,
          city: `city2`
        }
      ],
      activeCity: 1,
      selectedOffers: [{
          id: 3,
          city: `city2`
        },
        {
          id: 6,
          city: `city2`
        },
        {
          id: 8,
          city: `city2`
        }
      ],
      activeCard: null,
      screenType: ScreenType.MAIN
    })
  });

  it(`should change a screenType by payload`, () => {
    expect(reducer({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 0,
      selectedOffers: [`offer`],
      activeCard: null,
      screenType: ScreenType.MAIN
    }, {
      type: ActionType.CHANGE_SCREEN_TYPE,
      payload: ScreenType.PROPERTY
    })).toEqual({
      cities: [`city`],
      offers: [`offer`],
      activeCity: 0,
      selectedOffers: [`offer`],
      activeCard: null,
      screenType: ScreenType.PROPERTY
    })
  });
});

describe(`Test ActionCreator`, () => {
	it(`ActionCreator.changeCity should return a right action`, () => {
		expect(ActionCreator.changeCity(1)).toEqual({type: ActionType.CHANGE_CITY, payload: 1})
	});

	it(`ActionCreator.selectOffe should return a right actionrs`, () => {
		expect(ActionCreator.selectOffers()).toEqual({type: ActionType.SELECT_OFFERS})
	});

	it(`ActionCreator.changeActi should return a right actionveCard`, () => {
		expect(ActionCreator.changeActiveCard(`offer`)).toEqual({type: ActionType.CHANGE_ACTIVE_CARD, payload: `offer`})
	});

	it(`ActionCreator.changeScre should return a right actionenType`, () => {
		expect(ActionCreator.changeScreenType(ScreenType.MAIN)).toEqual({type: ActionType.CHANGE_SCREEN_TYPE, payload: ScreenType.MAIN})
	});
})
