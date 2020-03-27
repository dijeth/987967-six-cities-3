import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewList from './review-list';
import {UserReview} from '../../interfaces';

const mocks: Array<UserReview> = [{
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
},
];

it(`<ReviewList /> should be renderer correctly`, () => {
  const reviewList = renderer.create(<ReviewList reviews={mocks} />).toJSON();
  expect(reviewList).toMatchSnapshot();
});
