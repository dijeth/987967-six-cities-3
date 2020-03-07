import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import CardProperty from './card-property.jsx';
import NameSpace from '../../reducers/name-space.js';

const mockStore = configureStore([]);

const offer = {
  id: `1`,
  title: `Title-test`,
  type: `Apartment`,
  pictures: [
    `picture-src-test-1`,
    `picture-src-test-2`,
    `picture-src-test-3`,
    `picture-src-test-4`,
    `picture-src-test-5`,
    `picture-src-test-6`
  ],
  cost: 123,
  rating: 4.8,
  isPremium: true,
  isFavorite: false,
  city: `Amsterdam`,
  bedroomCount: 1,
  adultsCount: 2,
  insideFeatures: [`Feature-1`, `Feature-2`, `Feature-3`, `Feature-4`],
  userName: `userName`,
  userPicture: `userPicture`,
  isUserSuper: true,
  descriptionTitle: `descriptionTitle`,
  description: `description-paragraph-1\ndescription-paragraph-2\ndescription-paragraph-3`,
  reviews: [{
    id: `id-1`,
    userName: `userName-1`,
    userPicture: `userPicture-1`,
    rating: 4.8,
    description: `description-1`,
    date: new Date(1582194976548).toISOString()
  },
  {
    id: `id-2`,
    userName: `userName-2`,
    userPicture: `userPicture-2`,
    rating: 3.8,
    description: `description-2`,
    date: new Date(1583000000000).toISOString()
  }
  ]
};

const store = mockStore({
  [NameSpace.APP]: {
    activeOffer: offer
  }
});

const neighbourhoods = [{
  id: `near-id-1`,
  title: `near-title-1`,
  type: `Apartment`,
  pictures: [`near-pictures-1`],
  cost: 123,
  rating: 1.7,
  isPremium: true,
  isFavorite: true,
  city: `Amsterdam`,
  coord: [52.359385, 4.879898]
},
{
  id: `near-id-2`,
  title: `near-title-2`,
  type: `Apartment`,
  pictures: [`near-pictures-2`],
  cost: 456,
  rating: 2.7,
  isPremium: false,
  isFavorite: false,
  city: `Amsterdam`,
  coord: [52.353995, 4.911789]
},
{
  id: `near-id-3`,
  title: `near-title-3`,
  type: `Apartment`,
  pictures: [`near-pictures-3`],
  cost: 789,
  rating: 3.7,
  isPremium: true,
  isFavorite: false,
  city: `Amsterdam`,
  coord: [52.377303, 4.903075]
}
];

it(`<CardProperty /> should be render correctly`, () => {
  const tree = renderer.create(
      <Provider store={store}>
        <CardProperty
          offer={offer}
          neighbourhoods={neighbourhoods}
          isNearPlaces={true}
        />
      </Provider>, {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
