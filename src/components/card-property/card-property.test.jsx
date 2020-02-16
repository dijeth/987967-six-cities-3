import React from 'react';
import renderer from 'react-test-renderer';
import CardProperty from './card-property.jsx';

const mock = {
  id: `1`,
  title: `Title-test`,
  type: `Apartment`,
  pictures: [
    `picture-src-test-1`,
    `picture-src-test-2`,
    `picture-src-test-3`,
    `picture-src-test-4`,
    `picture-src-test-5`,
    `picture-src-test-6`
  ],
  cost: 123,
  rating: 4.8,
  isPremium: true,
  isFavorite: false,
  city: `Amsterdam`,
  bedroomCount: 1,
  adultsCount: 2,
  insideFeatures: [`Feature-1`, `Feature-2`, `Feature-3`, `Feature-4`]
};

it(`<CardProperty /> should be render correctly`, () => {
  const tree = renderer.create(<CardProperty offer={mock} />).toJSON();
  expect(tree).toMatchSnapshot();
});
