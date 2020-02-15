import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './place-card.jsx';

configure({
  adapter: new Adapter()
});

const mock = {
  id: `id-1`,
  title: `title-1`,
  type: `Apartment`,
  picture: `picture-1`,
  cost: 123,
  rating: 80,
  isPremium: false,
  isFavorite: true,
  city: `Amsterdam`
};

it(`When onMouseEnter to the PlaceCard the callback accepts its offer-object`, () => {
  const handleCardHover = jest.fn();

  const placeCard = shallow(<PlaceCard handleCardHover={handleCardHover} offer={mock} />);
  placeCard.simulate(`mouseenter`);

  expect(handleCardHover).toHaveBeenCalledTimes(1);
  expect(handleCardHover).toHaveBeenCalledWith(mock);
});
