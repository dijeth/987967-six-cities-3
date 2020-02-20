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
  insideFeatures: [`Feature-1`, `Feature-2`, `Feature-3`, `Feature-4`],
  userName: `userName`,
  userPicture: `userPicture`,
  isUserSuper: true,
  descriptionTitle: `descriptionTitle`,
  description: `description-paragraph-1\ndescription-paragraph-2\ndescription-paragraph-3`,
  reviews: [{
    id: `id-1`,
    userName: `userName-1`,
    userPicture: `userPicture-1`,
    rating: 4.8,
    description: `description-1`,
    date: new Date(1582194976548).toISOString()
  },
  {
    id: `id-2`,
    userName: `userName-2`,
    userPicture: `userPicture-2`,
    rating: 3.8,
    description: `description-2`,
    date: new Date(1583000000000).toISOString()
  },
  ]
};

it(`<CardProperty /> should be render correctly`, () => {
  const tree = renderer.create(<CardProperty offer={mock} />).toJSON();
  expect(tree).toMatchSnapshot();
});
