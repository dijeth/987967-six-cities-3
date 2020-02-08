import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const PLACES_COUNT = 100;
const PLACE_CARD_NAMES = [`placeCardName1`, `placeCardName2`];

it(`<App /> should be render correctly`, () => {
  const app = renderer.create(<App placesCount={PLACES_COUNT} placeCardNames={PLACE_CARD_NAMES}/>).toJSON();
  expect(app).toMatchSnapshot();
});
