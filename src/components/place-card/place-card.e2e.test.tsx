import * as React from 'react';
import * as Enzyme from 'enzyme';
import PlaceCard from './place-card';
import {PlaceCardType} from '../../const/const';
import {OfferMini} from '../../interfaces.js';
import {BrowserRouter} from 'react-router-dom';

const mock: OfferMini = {
  id: `id-1`,
  title: `title-1`,
  type: `apartment`,
  pictures: [`picture-1`],
  cost: 123,
  rating: 4.8,
  isPremium: false,
  isFavorite: true,
  city: `Amsterdam`,
  coord: [123, 456]
};

describe(`<PlaceCard />`, () => {
  it(`should call onHover once with its offer-object`, () => {
    const onHover = jest.fn();

    const placeCard = Enzyme.mount(
        <BrowserRouter>
          <PlaceCard
            onHover={onHover}
            offer={mock}
            isAuth={false}
            type={PlaceCardType.DEFAULT}
          />
        </BrowserRouter>);
    placeCard.simulate(`mouseenter`);

    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover).toHaveBeenCalledWith(mock);
  });

  it(`should call onHover once with null`, () => {
    const onHover = jest.fn();

    const placeCard = Enzyme.mount(
        <BrowserRouter>
          <PlaceCard
            onHover={onHover}
            offer={mock}
            isAuth={false}
            type={PlaceCardType.DEFAULT}
          />
        </BrowserRouter>
    );
    placeCard.simulate(`mouseleave`);

    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover).toHaveBeenCalledWith(null);
  });
});
