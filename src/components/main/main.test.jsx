import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const offerList = [{
  id: `id-1`,
  title: `title-1`,
  type: `Apartment`,
  pictures: [`picture-1`],
  cost: 123,
  rating: 4.8,
  isPremium: false,
  isFavorite: true,
  city: `city1`,
  coord: [52.372447, 4.882779]
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
  city: `city1`,
  coord: [52.372448, 4.882770]
}
];

const isNearPlaces = false;
const cities = [`city1`, `city2`, `city3`, `city4`];
const activeCity = 0;
const activeCard = null;

it(`<Main /> should be render correctly`, () => {
  const store = mockStore({});

  const main = renderer.create(
    <Provider store={store}>
      <Main
        offerList={offerList}
        isNearPlaces={isNearPlaces}
        cities={cities}
        activeCity={activeCity}
        activeCard={activeCard}
      />
    </Provider>, {
    createNodeMock: () => document.createElement(`div`)
  }).toJSON();
  expect(main).toMatchSnapshot();
});
