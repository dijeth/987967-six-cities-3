import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const PLACES_COUNT = 100;
const PLACE_CARD_NAMES = [`placeCardName4`, `placeCardName5`];

it(`<Main /> should be render correctly`, () => {
  const main = renderer.create(<Main placesCount={PLACES_COUNT} placeCardNames={PLACE_CARD_NAMES}/>).toJSON();
  expect(main).toMatchSnapshot();
});
