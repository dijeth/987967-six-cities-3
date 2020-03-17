import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {PlaceCardList} from './place-card-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

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

describe(`When nearPlacesFor === undefined>`, () => {
  const handleOfferHover = jest.fn();
  const handleListClick = jest.fn();
  const tree = Enzyme.mount(
      <BrowserRouter>
        <PlaceCardList
          items={mocks}
          onOfferHover={handleOfferHover}
          onListClick={handleListClick}
          isAuth={true}
        />
        <Switch>
          <Route exact path="/offer/:id" />
        </Switch>
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

describe(`When nearPlacesFor === 1>`, () => {
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
        />
        <Switch>
          <Route exact path="/offer/:id" />
        </Switch>
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

describe(`When place-card-list with-active-item`, () => {
  const handleActiveItemChange = jest.fn();
  const PlaceCardListWithActiveItem = withActiveItem(PlaceCardList, `.place-card__name`);

  const tree = Enzyme.mount(
      <BrowserRouter>
        <PlaceCardListWithActiveItem
          items={mocks}
          onOfferHover={() => {}}
          onActiveItemChange={handleActiveItemChange}
          isAuth={true}
        />
        <Switch>
          <Route exact path="/offer/:id" />
        </Switch>
      </BrowserRouter>);

  const card = tree.find(`article`).at(2);
  const cardTitle = card.find(`.place-card__name a`);

  it(`should call onActiveItemChange once`, () => {
    cardTitle.simulate(`click`);
    expect(handleActiveItemChange).toHaveBeenCalledTimes(1);
  });

  it(`should not call onActiveItemChange`, () => {
    card.simulate(`click`);
    expect(handleActiveItemChange).toHaveBeenCalledTimes(1);
  });
});
