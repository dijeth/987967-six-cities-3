import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {App} from './app.jsx';
import {ScreenType, SortType} from '../../const/const.js';
import NameSpace from '../../reducers/name-space.js';

const mockStore = configureStore([]);

const offers = [{
  id: `1`,
  title: `title-1`,
  type: `Apartment`,
  pictures: [`picture-1`],
  cost: 123,
  rating: 4.8,
  isPremium: false,
  isFavorite: true,
  city: `Amsterdam`,
  userName: `userName-1`,
  description: `description-1`,
  descriptionTitle: `descriptionTitle-1`,
  coord: [52.372447, 4.882779]
},
{
  id: `2`,
  title: `title-2`,
  type: `Apartment`,
  pictures: [`picture-2`],
  cost: 456,
  rating: 5,
  isPremium: true,
  isFavorite: false,
  city: `Amsterdam`,
  userName: `userName-2`,
  description: `description-2`,
  descriptionTitle: `descriptionTitle-2`,
  coord: [52.372448, 4.882770]
},
{
  id: `3`,
  title: `title-2`,
  type: `Apartment`,
  pictures: [`picture-2`],
  cost: 456,
  rating: 5,
  isPremium: true,
  isFavorite: false,
  city: `Amsterdam`,
  userName: `userName-2`,
  description: `description-2`,
  descriptionTitle: `descriptionTitle-2`,
  coord: [52.372448, 4.882770]
},
{
  id: `4`,
  title: `title-2`,
  type: `Apartment`,
  pictures: [`picture-2`],
  cost: 456,
  rating: 5,
  isPremium: true,
  isFavorite: false,
  city: `Amsterdam`,
  userName: `userName-2`,
  description: `description-2`,
  descriptionTitle: `descriptionTitle-2`,
  coord: [52.372448, 4.882770]
},
{
  id: `5`,
  title: `title-2`,
  type: `Apartment`,
  pictures: [`picture-2`],
  cost: 456,
  rating: 5,
  isPremium: true,
  isFavorite: false,
  city: `Amsterdam`,
  userName: `userName-2`,
  description: `description-2`,
  descriptionTitle: `descriptionTitle-2`,
  coord: [52.372448, 4.882770]
},
{
  id: `6`,
  title: `title-2`,
  type: `Apartment`,
  pictures: [`picture-2`, `picture-2`, `picture-2`, `picture-2`, `picture-2`, `picture-2`],
  cost: 456,
  rating: 5,
  isPremium: true,
  isFavorite: false,
  city: `Amsterdam`,
  userName: `userName-2`,
  description: `description-2`,
  descriptionTitle: `descriptionTitle-2`,
  coord: [52.372448, 4.882770]
}
];

const store = mockStore({
  [NameSpace.DATA]: {
    offers,
    cities: [{name: `Amsterdam`, centerCoord: [1, 2]}]
  },

  [NameSpace.APP]: {
    activeOffer: null,
    activeCity: {name: `Amsterdam`, centerCoord: [1, 2]},
    screenType: ScreenType.MAIN,
    sortType: SortType.POPULAR
  }
});

it(`should render <Main /> when screenType === ScreenType.MAIN`, () => {
  const tree = renderer.create(
      <Provider store={store}>
        <App
          offers = {offers}
          screenType = {ScreenType.MAIN}
          activeOffer = {null}
        />
      </Provider>, {createNodeMock: () => document.createElement(`div`)}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
