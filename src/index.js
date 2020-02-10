import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';

const rootElement = document.getElementById(`root`);
const PLACES_COUNT = 312;
const PLACE_CARD_NAMES = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`];

ReactDom.render(<App placesCount={PLACES_COUNT} placeCardNames={PLACE_CARD_NAMES} />, rootElement);
