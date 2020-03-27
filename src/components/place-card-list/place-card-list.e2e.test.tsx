import * as React from 'react';
import * as Enzyme from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import {PlaceCardList} from './place-card-list';
import {PlaceCardType} from '../../const/const';
import {OfferMini} from '../../interfaces.js';

const mocks: Array<OfferMini> = [{
  id: `id-1`,
  title: `title-1`,
  type: `apartment`,
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
  type: `apartment`,
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
  type: `apartment`,
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
  type: `apartment`,
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
          activeItem={null}
          onActiveItemChange={() => undefined}

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
          activeItem={null}
          onActiveItemChange={() => undefined}
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
