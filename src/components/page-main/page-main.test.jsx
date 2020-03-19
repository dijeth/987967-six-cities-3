import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';
import {PageMain} from './page-main.jsx';
import {SortType} from '../../const/const.js';
import NameSpace from '../../reducers/name-space.js';

const mockStore = configureStore([]);

const cities = [{
  name: `city-1`,
  centerCoord: [1, 2],
  zoom: 3
}];

const offers = [{
  city: `city-1`,
  pictures: [`picture-1`],
  title: `title-1`,
  isFavorite: true,
  isPremium: false,
  rating: 1,
  type: `type-1`,
  cost: 1,
  coord: [11, 111],
  id: `1`
},
{
  city: `city-1`,
  pictures: [`picture-2`],
  title: `title-2`,
  isFavorite: true,
  isPremium: false,
  rating: 1,
  type: `type-1`,
  cost: 2,
  coord: [22, 222],
  id: `2`
},
{
  city: `city-1`,
  pictures: [`picture-3`],
  title: `title-3`,
  isFavorite: true,
  isPremium: false,
  rating: 1,
  type: `type-1`,
  cost: 3,
  coord: [33, 333],
  id: `3`
},
{
  city: `city-1`,
  pictures: [`picture-4`],
  title: `title-4`,
  isFavorite: true,
  isPremium: false,
  rating: 1,
  type: `type-1`,
  cost: 4,
  coord: [44, 444],
  id: `4`
},
];

const store = mockStore({
  [NameSpace.USER]: {
    isAuthorized: false
  },
  [NameSpace.APP]: {
    activeOffer: null
  },
  [NameSpace.DATA]: {
    offers
  }
});

it(`<PageMain /> should be rendered correctly`, () => {
  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <PageMain
            activeCity={cities[0]}
            cities={cities}
            offers={offers}
            sortType={SortType.POPULAR}
            isAuth={true}
            offersCoord={[[11, 111],
              [22, 222],
              [33, 333],
              [44, 444]]}
          />
        </BrowserRouter>
      </Provider>, {createNodeMock: () => document.createElement(`div`)}).toJSON();

  expect(tree).toMatchSnapshot();
});
