import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { OffersFavorite } from './offers-favorite.jsx';
import NameSpace from '../../reducers/name-space.js';

Enzyme.configure({
	adapter: new Adapter()
});

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APP]: {
    activeOffer: null,
  }
});

const favorites = [{
  id: `1`,
  city: `Dusseldorf`,
  pictures: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  ],
  title: `Nice, cozy, warm big bed apartment`,
  isFavorite: true,
  isPremium: true,
  rating: 3.5,
  type: `house`,
  cost: 868,
  isSuperUser: true,
  userID: `25`,
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
  isFavorite: true,
  isPremium: false,
  rating: 4.5,
  type: `room`,
  cost: 270,
  isSuperUser: true,
  userID: `25`,
  coord: [50.869557,
    4.332697
  ],
  zoom: 16
}]

it(`<OffersFavorite /> should be rendered correctly`, () => {
	const div = document.createElement(`div`);
	document.body.appendChild(div);

	const handleCityClick = jest.fn();

  const tree = Enzyme.mount(
    <BrowserRouter>
	  	<Provider store={store}>
				<OffersFavorite isAuth={true} favoriteItems={favorites} onCityClick={handleCityClick} />
	  	</Provider>
  	</BrowserRouter>, { attachTo: div }
  );

  const link = tree.find(`a.locations__item-link`);

console.log(link.debug())

  link.simulate(`click`);

  expect(handleCityClick).toHaveBeenCalledTimes(1);
})
