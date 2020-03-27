import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Review from './review';

const mock = {
  id: `id-1`,
  userName: `userName-1`,
  userPicture: `userPicture-1`,
  rating: 4.8,
  description: `description-1`,
  date: new Date(1582194976548).toISOString()
};

it(`<Review /> should be render correctly`, () => {
  const review = renderer.create(<Review {...mock} />).toJSON();
  expect(review).toMatchSnapshot();
});
