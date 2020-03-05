import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer.js';
import {Operation} from './reducers/operation.js';
import {createAPI} from './api.js';

const onUnauthorized = () => {};
const api = createAPI(onUnauthorized);

const rootElement = document.getElementById(`root`);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(Operation.loadOffers());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,

    rootElement
);
