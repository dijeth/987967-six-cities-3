import * as React from 'react';
import * as Enzyme from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {PageFavorites} from './page-favorites';
import NameSpace from '../../reducers/name-space.js';
import {AuthorizationStatus} from '../../const/const';
import {BrowserRouter} from 'react-router-dom';
import {FavoriteOffers} from '../../interfaces.js';

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APP]: {
    activeOffer: null,
  },

  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH
  }
});

const favorites = {
  offers: {
    [`Dusseldorf`]: [
      {
        id: `1`,
        city: `Dusseldorf`,
        pictures: [
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`
        ],
        title: `Nice, cozy, warm big bed apartment`,
        isFavorite: true,
        isPremium: true,
        rating: 3.5,
        type: `house`,
        cost: 868,
        coord: [51.237402, 6.797314],
      }
    ],
    [`Brussels`]: [
      {
        id: `2`,
        city: `Brussels`,
        pictures: [
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`
        ],
        title: `The Pondhouse - A Magical Place`,
        isFavorite: true,
        isPremium: false,
        rating: 4.5,
        type: `room`,
        cost: 270,
        coord: [50.869557, 4.332697],
      }
    ]
  } as FavoriteOffers,

  cities: [`Brussels`, `Dusseldorf`]
};

it(`<PageFavorites /> should be rendered correctly`, () => {
  const tree = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <PageFavorites isAuth={true} favoriteData={favorites} />
        </BrowserRouter>
      </Provider>
  );
  expect(tree.getDOMNode()).toMatchSnapshot();
});
