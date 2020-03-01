import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const offers = [{
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
const cities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`];
const activeCity = 0;
const activeOffer = null;

it(`<Main /> should be render correctly`, () => {
  const store = mockStore({});

  const main = renderer.create(
      <Provider store={store}>
        <Main
          offers={offers}
          isNearPlaces={isNearPlaces}
          cities={cities}
          activeCity={activeCity}
          activeOffer={activeOffer}
          sortedIDs={[`id-1`, `id-2`]}
        />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();
  expect(main).toMatchSnapshot();
});
