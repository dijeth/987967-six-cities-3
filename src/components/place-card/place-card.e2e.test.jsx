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
  pictures: [`picture-1`],
  cost: 123,
  rating: 4.8,
  isPremium: false,
  isFavorite: true,
  city: `Amsterdam`,
  coord: [123, 456]
};

describe(`When onHover was passed`, () => {
  it(`should call onHover once with its offer-object`, () => {
    const onHover = jest.fn();

    const placeCard = shallow(<PlaceCard onHover={onHover} offer={mock} isNearPlaces={false}/>);
    placeCard.simulate(`mouseenter`);

    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover).toHaveBeenCalledWith(mock);
  });

  it(`should call onHover once with null`, () => {
    const onHover = jest.fn();

    const placeCard = shallow(<PlaceCard onHover={onHover} offer={mock} isNearPlaces={false}/>);
    placeCard.simulate(`mouseleave`);

    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover).toHaveBeenCalledWith(null);
  });
});
