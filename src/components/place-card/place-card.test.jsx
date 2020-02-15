import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card.jsx';

const mock = {
  id: `id-1`,
  title: `title-1`,
  type: `Apartment`,
  pictures: [`picture-1`],
  cost: 123,
  rating: 4.8,
  isPremium: false,
  isFavorite: true,
  city: `Amsterdam`
};

it(`<PlaceCard /> should be render correctly`, () => {
  const card = renderer.create(<PlaceCard offer={mock} />).toJSON();
  expect(card).toMatchSnapshot();
});
