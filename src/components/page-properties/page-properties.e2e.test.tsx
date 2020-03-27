import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { PageProperties } from './page-properties';
import NameSpace from '../../reducers/name-space.js';
import { EMPTY_REVIEW } from '../../const/const';
import { Offer } from '../../interfaces';
import { coord } from '../../types';

const mockStore = configureStore([]);

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

const neighbourhoods = [{
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
];

const activeOffer: Offer = {
  id: `id`,
  title: `title`,
  type: `room`,
  pictures: [`picture-1`, `picture-2`, `picture-3`, `picture-4`, `picture-5`, `picture-6`],
  cost: 123,
  rating: 1,
  isPremium: true,
  isFavorite: false,
  city: `city-1`,
  bedroomCount: 1,
  adultsCount: 1,
  insideFeatures: [`insideFeatures`],
  userName: `userName`,
  userPicture: `userPicture`,
  isSuperUser: true,
  descriptionTitle: `descriptionTitle`,
  description: `description`,
  coord: [1, 2],
  zoom: 1
};

const store = mockStore({
  [NameSpace.USER]: {
    isAuthorized: false,
    userReviewText: EMPTY_REVIEW.text,
    userReviewRating: EMPTY_REVIEW.rating,
    userReviewOfferID: EMPTY_REVIEW.offerID,
  },
  [NameSpace.APP]: {
    activeOffer,
    activeCity: {
      name: `city-1`,
      centerCoord: [1, 2],
      zoom: 3
    }
  },
  [NameSpace.DATA]: {
    offers,
    nearbyList: neighbourhoods
  }
});

it(`should call a onFavoriteChange when changing a favorite toggle`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const handleFavoriteChange = jest.fn();

  const tree = Enzyme.mount(
    <Provider store={store}>
      <BrowserRouter>
        <PageProperties
          isAuthorized={true}
          offer={activeOffer}
          activeCityCoord={[1, 2]}
          reviews={[]}
          offersCoord={neighbourhoods.map((it) => it.coord) as Array<coord>}
          onFavoriteChange={handleFavoriteChange}
        />
      </BrowserRouter>
    </Provider>, { attachTo: div });

  tree.find(`.property__bookmark-button`).at(0).simulate(`click`);

  expect(handleFavoriteChange).toHaveBeenCalledTimes(1);
  expect(handleFavoriteChange).toHaveBeenNthCalledWith(1, activeOffer);
})