import React from 'react';
import renderer from 'react-test-renderer';
import {PlaceCardList} from './place-card-list.jsx';
import {BrowserRouter} from 'react-router-dom';
import {PlaceCardType} from '../../const/const';

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

describe(`<PlaceCardList /> should be render correctly`, () => {
  it(`when type === DEFAULT, isAuth === false`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <PlaceCardList
            type={PlaceCardType.DEFAULT}
            items={mocks}
            onOfferHover={()=>{}}
            isAuth={false}
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
            onOfferHover={()=>{}}
            isAuth={true}
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
            nearPlacesFor={`1`}
            onOfferHover={()=>{}}
            isAuth={true}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
