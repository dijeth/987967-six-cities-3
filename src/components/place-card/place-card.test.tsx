import * as React from 'react';
import * as renderer from 'react-test-renderer';
import PlaceCard from './place-card';
import {BrowserRouter} from 'react-router-dom';
import {PlaceCardType} from '../../const/const';
import { OfferMini } from '../../interfaces.js';

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

describe(`<PlaceCard /> should be render correctly`, () => {
  it(`with type === "DEFAULT"`, () => {
    const card = renderer.create(
        <BrowserRouter>
          <PlaceCard
            offer={mock}
            onHover={() => {}}
            type={PlaceCardType.DEFAULT}
            isAuth={true}
          />
        </BrowserRouter>
    ).toJSON();

    expect(card).toMatchSnapshot();
  });

  it(`with type === "FAVORITE"`, () => {
    const card = renderer.create(
        <BrowserRouter>
          <PlaceCard
            offer={mock}
            onHover={() => {}}
            type={PlaceCardType.FAVORITE}
            isAuth={true}
          />
        </BrowserRouter>
    ).toJSON();

    expect(card).toMatchSnapshot();
  });

  it(`with type === "NEARBY"`, () => {
    const card = renderer.create(
        <BrowserRouter>
          <PlaceCard
            offer={mock}
            onHover={() => {}}
            type={PlaceCardType.NEARBY}
            isAuth={true}
          />
        </BrowserRouter>
    ).toJSON();

    expect(card).toMatchSnapshot();
  });

  it(`with isPremium === true`, () => {
    mock.isPremium = true;
    const card = renderer.create(
        <BrowserRouter>
          <PlaceCard
            offer={mock}
            onHover={() => {}}
            type={PlaceCardType.DEFAULT}
            isAuth={true}
          />
        </BrowserRouter>
    ).toJSON();

    expect(card).toMatchSnapshot();
  });

  it(`with isFavorite === false`, () => {
    mock.isFavorite = false;
    const card = renderer.create(
        <BrowserRouter>
          <PlaceCard
            offer={mock}
            onHover={() => {}}
            type={PlaceCardType.DEFAULT}
            isAuth={true}
          />
        </BrowserRouter>
    ).toJSON();

    expect(card).toMatchSnapshot();
  });
});
