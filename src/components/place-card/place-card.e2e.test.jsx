import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PlaceCard } from './place-card.jsx';
import { ScreenType } from '../../const.js';


configure({
  adapter: new Adapter()
});

const mockStore = configureStore([]);

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

describe(`When isNearPlaces === false`, () => {
  it(`should call onCardHover once with its offer-object`, () => {
    const onCardHover = jest.fn();

    const placeCard = shallow(<PlaceCard onCardHover={onCardHover} offer={mock} isNearPlaces={false}/>);
    placeCard.simulate(`mouseenter`);

    expect(onCardHover).toHaveBeenCalledTimes(1);
    expect(onCardHover).toHaveBeenCalledWith(mock);
  });

  it(`should call onCardHover once with null`, () => {
    const onCardHover = jest.fn();

    const placeCard = shallow(<PlaceCard onCardHover={onCardHover} offer={mock} isNearPlaces={false}/>);
    placeCard.simulate(`mouseleave`);

    expect(onCardHover).toHaveBeenCalledTimes(1);
    expect(onCardHover).toHaveBeenCalledWith(null);
  });

  it(`should call onCardClick once with its offer-object`, () => {
    const onCardClick = jest.fn();

    const placeCard = shallow(<PlaceCard onCardClick={onCardClick} offer={mock} isNearPlaces={false}/>);
    const title = placeCard.find(`.place-card__name a`);
    title.simulate(`click`);

    expect(onCardClick).toHaveBeenCalledTimes(1);
    expect(onCardClick).toHaveBeenCalledWith(mock);
  })
});

describe(`When isNearPlaces === true`, () => {
  it(`should not call onCardHover`, () => {
    const onCardHover = jest.fn();

    const placeCard = shallow(<PlaceCard onCardHover={onCardHover} offer={mock} isNearPlaces={true}/>);
    placeCard.simulate(`mouseenter`);

    expect(onCardHover).toHaveBeenCalledTimes(0);
  });

  it(`should call onCardClick once with its offer-object`, () => {
    const onCardClick = jest.fn();

    const placeCard = shallow(<PlaceCard onCardClick={onCardClick} offer={mock} isNearPlaces={true}/>);
    const title = placeCard.find(`.place-card__name a`);
    title.simulate(`click`);

    expect(onCardClick).toHaveBeenCalledTimes(1);
    expect(onCardClick).toHaveBeenCalledWith(mock);
  })
});