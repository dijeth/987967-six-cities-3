import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {PlaceCardList} from './place-card-list.jsx';
import {PlaceCardType} from '../../const/const';

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
},
{
  id: `id-3`,
  title: `title-3`,
  type: `Apartment`,
  pictures: [`picture-3`],
  cost: 456,
  rating: 5,
  isPremium: true,
  isFavorite: false,
  city: `Amsterdam`,
  coord: [3, 4]
},
{
  id: `id-4`,
  title: `title-4`,
  type: `Apartment`,
  pictures: [`picture-4`],
  cost: 456,
  rating: 5,
  isPremium: true,
  isFavorite: false,
  city: `Amsterdam`,
  coord: [3, 4]
}
];

describe(`<PlaceCardList /> when type === DEFAULT>`, () => {
  const handleOfferHover = jest.fn();
  const handleListClick = jest.fn();
  const tree = Enzyme.mount(
      <BrowserRouter>
        <PlaceCardList
          items={mocks}
          onOfferHover={handleOfferHover}
          onListClick={handleListClick}
          isAuth={true}
          type={PlaceCardType.DEFAULT}
        />
      </BrowserRouter>);

  const card = tree.find(`article`).at(0);

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

  it(`should call onListClick`, () => {
    tree.simulate(`click`);
    expect(handleListClick).toHaveBeenCalledTimes(1);
  });
});

describe(`<PlaceCardList /> when type === NEARBY>`, () => {
  const handleOfferHover = jest.fn();
  const handleListClick = jest.fn();
  const tree = Enzyme.mount(
      <BrowserRouter>
        <PlaceCardList
          items={mocks}
          nearPlacesFor={`1`}
          onOfferHover={handleOfferHover}
          onListClick={handleListClick}
          isAuth={true}
          type={PlaceCardType.NEARBY}
        />
      </BrowserRouter>);

  const card = tree.find(`article`).at(0);

  it(`should not call onOfferHover`, () => {
    card.simulate(`mouseenter`);
    expect(handleOfferHover).toHaveBeenCalledTimes(0);
  });

  it(`should call onListClick`, () => {
    tree.simulate(`click`);
    expect(handleListClick).toHaveBeenCalledTimes(1);
  });
});
