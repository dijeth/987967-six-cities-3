import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {PlaceCardList} from './place-card-list';
import {BrowserRouter} from 'react-router-dom';
import {PlaceCardType} from '../../const/const';
import {OfferMini} from '../../interfaces';

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
}
];

describe(`<PlaceCardList /> should be render correctly`, () => {
  it(`when type === DEFAULT, isAuth === false`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <PlaceCardList
            type={PlaceCardType.DEFAULT}
            items={mocks}
            onOfferHover={() => undefined}
            isAuth={false}
            activeItem={null}
            onActiveItemChange={() => undefined}
            onListClick={() => undefined}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when type === FAVORITE, isAuth === true`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <PlaceCardList
            type={PlaceCardType.FAVORITE}
            items={mocks}
            onOfferHover={() => undefined}
            isAuth={true}
            activeItem={null}
            onActiveItemChange={() => undefined}
            onListClick={() => undefined}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when type === NEARBY`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <PlaceCardList
            type={PlaceCardType.NEARBY}
            items={mocks}
            nearPlacesFor="1"
            onOfferHover={() => undefined}
            isAuth={true}
            activeItem={null}
            onActiveItemChange={() => undefined}
            onListClick={() => undefined}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
