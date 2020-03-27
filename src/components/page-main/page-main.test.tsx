import * as React from 'react';
import * as Enzyme from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';
import {PageMain} from './page-main';
import {SortType} from '../../const/const';
import NameSpace from '../../reducers/name-space.js';
import { City, OfferMini } from '../../interfaces.js';
import { coord } from '../../types';

const mockStore = configureStore([]);

const cities: Array<City> = [{
  name: `city-1`,
  centerCoord: [1, 2],
  zoom: 3
}];

const offers: Array<OfferMini> = [{
  city: `city-1`,
  pictures: [`picture-1`],
  title: `title-1`,
  isFavorite: true,
  isPremium: false,
  rating: 1,
  type: `apartment`,
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
  type: `apartment`,
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
  type: `apartment`,
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
  type: `apartment`,
  cost: 4,
  coord: [44, 444],
  id: `4`
},
];

const offersCoord: Array<coord> = [
  [11, 111],
  [22, 222],
  [33, 333],
  [44, 444],
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
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const tree = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <PageMain
            activeCity={cities[0]}
            cities={cities}
            offersCoord={offersCoord}
            sortType={SortType.POPULAR}
            isAuth={true}
          />
        </BrowserRouter>
      </Provider>, {attachTo: div});

  expect(tree.getDOMNode()).toMatchSnapshot();
});
