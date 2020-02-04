import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';

const rootElement = document.getElementById(`#root`);
const PLACES_COUNT = 312;

ReactDom.render(<App placesCount={PLACES_COUNT} />, rootElement);
