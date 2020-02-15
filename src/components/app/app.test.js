import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

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
  city: `Amsterdam`
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
  city: `Brussels`
}];

it(`<App /> should be render correctly`, () => {
  const app = renderer.create(<App placesCount={PLACES_COUNT} offerList={mocks}/>).toJSON();
  expect(app).toMatchSnapshot();
});
