import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PlaceCardList} from './place-card-list.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

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
  coord: [1, 2]
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
  city: `Amsterdam`,
  coord: [3, 4]
}
];

describe(`When isNearPlaces === false>`, () => {
  const handleOfferHover = jest.fn();
  const handleOfferClick = jest.fn();
  const tree = Enzyme.mount(
      <PlaceCardList
        offerList={mocks}
        isNearPlaces={false}
        onOfferHover={handleOfferHover}
        onOfferClick={handleOfferClick}
      />);

  const card = tree.find(`article`).at(0);
  const cardTitle = card.find(`.place-card__name a`).at(0);

  it(`should not call onOfferHover`, () => {
    tree.simulate(`mouseenter`);
    expect(handleOfferHover).toHaveBeenCalledTimes(0);
  });

  it(`should call onOfferHover with mocks[0]`, () => {
    card.simulate(`mouseenter`);
    expect(handleOfferHover).toHaveBeenCalledTimes(1);
    expect(handleOfferHover).toHaveBeenCalledWith(mocks[0]);
  });

  it(`should call onOfferHover with null`, () => {
    card.simulate(`mouseleave`);
    expect(handleOfferHover).toHaveBeenCalledTimes(2);
    expect(handleOfferHover).toHaveBeenCalledWith(null);
  });

  it(`should call onOfferClick with null`, () => {
    tree.simulate(`click`);
    expect(handleOfferClick).toHaveBeenCalledTimes(0);
  });

  it(`should call onOfferClick with mocks[0]`, () => {
    cardTitle.simulate(`click`);
    expect(handleOfferClick).toHaveBeenCalledTimes(1);
    expect(handleOfferClick).toHaveBeenCalledWith(mocks[0]);
  });
});

describe(`When isNearPlaces === true>`, () => {
  const handleOfferHover = jest.fn();
  const handleOfferClick = jest.fn();
  const tree = Enzyme.mount(
      <PlaceCardList
        offerList={mocks}
        isNearPlaces={true}
        onOfferHover={handleOfferHover}
        onOfferClick={handleOfferClick}
      />);

  const card = tree.find(`article`).at(0);
  const cardTitle = card.find(`.place-card__name a`).at(0);

  it(`should not call onOfferHover`, () => {
    tree.simulate(`mouseenter`);
    expect(handleOfferHover).toHaveBeenCalledTimes(0);
  });

  it(`should call onOfferHover with mocks[0]`, () => {
    card.simulate(`mouseenter`);
    expect(handleOfferHover).toHaveBeenCalledTimes(0);
  });

  it(`should call onOfferClick with null`, () => {
    tree.simulate(`click`);
    expect(handleOfferClick).toHaveBeenCalledTimes(0);
  });

  it(`should call onOfferClick with mocks[0]`, () => {
    cardTitle.simulate(`click`);
    expect(handleOfferClick).toHaveBeenCalledTimes(1);
    expect(handleOfferClick).toHaveBeenCalledWith(mocks[0]);
  });
});
