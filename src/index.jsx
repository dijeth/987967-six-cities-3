import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';
import {offerMocks} from './mocks/offers.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer.js';

const rootElement = document.getElementById(`root`);
const placesCount = offerMocks.length;
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);

ReactDom.render(
    <Provider store={store}>
      <App placesCount={placesCount} offerList={offerMocks} />
    </Provider>, rootElement);
