import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {App} from './app.jsx';
import NameSpace from '../../reducers/name-space.js';
import {SortType} from '../../const/const.js';

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: `NO_AUTH`,
    authInfo: null,
  },

  [NameSpace.DATA]: {
    cities: [{
      name: `Dusseldorf`,
      zoom: 13,
      centerCoord: [51.225402, 6.776314]
    }, {
      name: `Brussels`,
      zoom: 13,
      centerCoord: [50.846557, 4.351697]
    }],

    offers: [{
      id: `1`,
      city: `Dusseldorf`,
      pictures: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
      ],
      title: `Nice, cozy, warm big bed apartment`,
      descriptionTitle: `Meet the host`,
      isFavorite: false,
      isPremium: true,
      rating: 3.5,
      type: `house`,
      bedroomCount: 2,
      adultsCount: 4,
      cost: 868,
      insideFeatures: [
        `Laptop friendly workspace`,
        `Breakfast`,
        `Baby seat`,
        `Towels`,
        `Washer`,
        `Air conditioning`,
      ],
      userName: `Angelina`,
      userPicture: `img/avatar-angelina.jpg`,
      isSuperUser: true,
      userID: `25`,
      description: `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.`,
      coord: [51.237402,
        6.797314
      ],
      zoom: 16
    }, {
      id: `2`,
      city: `Brussels`,
      pictures: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`
      ],
      title: `The Pondhouse - A Magical Place`,
      descriptionTitle: `Meet the host`,
      isFavorite: false,
      isPremium: false,
      rating: 4.5,
      type: `room`,
      bedroomCount: 1,
      adultsCount: 3,
      cost: 270,
      insideFeatures: [`Washer`,
        `Laptop friendly workspace`,
        `Air conditioning`,
        `Breakfast`
      ],
      userName: `Angelina`,
      userPicture: `img/avatar-angelina.jpg`,
      isSuperUser: true,
      userID: `25`,
      description: `Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.`,
      coord: [50.869557,
        4.332697
      ],
      zoom: 16
    }]
  },

  [NameSpace.APP]: {
    pageError: ``,
    loading: 0,
    activeCity: `Dusseldorf`,
    activeOffer: null,
    sortType: SortType.POPULAR,
  }
});

it(`1`, () => {
  const tree = renderer.create(
      <Provider store={store}>
        <App isAuth={true} />
      </Provider>,
      {createNodeMock: () => document.createElement(`div`)}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
