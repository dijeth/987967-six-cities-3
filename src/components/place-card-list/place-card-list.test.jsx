import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCardList from './place-card-list.jsx';

const mocks = [{
  id: `id-1`,
  title: `title-1`,
  type: `Apartment`,
  picture: `picture-1`,
  cost: 123,
  rating: 80,
  isPremium: false,
  isFavorite: true,
  city: `Amsterdam`
},
{
  id: `id-2`,
  title: `title-2`,
  type: `Apartment`,
  picture: `picture-2`,
  cost: 456,
  rating: 100,
  isPremium: true,
  isFavorite: false,
  city: `Brussels`
}
];

it(`<PlaceCardList /> should be render correctly`, () => {
  const card = renderer.create(<PlaceCardList offerList={mocks} />).toJSON();
  expect(card).toMatchSnapshot();
});
