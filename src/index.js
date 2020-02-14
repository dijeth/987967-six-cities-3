import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';
import {offerMocks} from './mocks/offers.js';

const rootElement = document.getElementById(`root`);
const placesCount = offerMocks.length;

ReactDom.render(<App placesCount={placesCount} offerList={offerMocks} />, rootElement);
