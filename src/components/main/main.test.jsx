import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const PLACES_COUNT = 100;
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
  city: `Brussels`,
  coord: [52.372448, 4.882770]
}
];

it(`<Main /> should be render correctly`, () => {
  const main = renderer.create(<Main placesCount={PLACES_COUNT} offerList={mocks}/>, {
    createNodeMock: () => document.createElement(`div`)
  }).toJSON();
  expect(main).toMatchSnapshot();
});
