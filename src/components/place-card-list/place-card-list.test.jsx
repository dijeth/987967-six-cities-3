import React from 'react';
import renderer from 'react-test-renderer';
import {PlaceCardList} from './place-card-list.jsx';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

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
  it(`when isNearPlaces === false`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <PlaceCardList
            items={mocks}
            isNearPlaces={false}
            onOfferHover={()=>{}}
            onOfferClick={()=>{}}
          />
          <Switch>
            <Route exact path="/offer/:id" />
          </Switch>
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when isNearPlaces === true`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <PlaceCardList
            items={mocks}
            isNearPlaces={true}
            onOfferHover={()=>{}}
            onOfferClick={()=>{}}
          />
          <Switch>
            <Route exact path="/offer/:id" />
          </Switch>
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
