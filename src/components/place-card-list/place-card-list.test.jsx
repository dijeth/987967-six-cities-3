import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCardList from './place-card-list.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const mocks = [{
    id: `id-1`,
    title: `title-1`,
    type: `Apartment`,
    pictures: [`picture-1`],
    cost: 123,
    rating: 4.8,
    isPremium: false,
    isFavorite: true,
    city: `Amsterdam`,
    coord: [1, 2]
  },
  {
    id: `id-2`,
    title: `title-2`,
    type: `Apartment`,
    pictures: [`picture-2`],
    cost: 456,
    rating: 5,
    isPremium: true,
    isFavorite: false,
    city: `Amsterdam`,
    coord: [3, 4]
  }
];

describe(`<PlaceCardList /> should be render correctly`, () => {
  const store = mockStore({});

  it(`when isNearPlaces === false`, () => {
    const card = renderer.create(
      <Provider store={store}>
        <PlaceCardList offerList={mocks} isNearPlaces={false} />
      </Provider>).toJSON();
    
    expect(card).toMatchSnapshot();
  });

  it(`when isNearPlaces === true`, () => {
    const card = renderer.create(
      <Provider store={store}>
        <PlaceCardList offerList={mocks} isNearPlaces={true} />
      </Provider>).toJSON();
    
    expect(card).toMatchSnapshot();
  });
})
