import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer.js';
import {Operation as DataOperation} from './reducers/operation.js';
import {Operation as UserOperation} from './reducers/user/operation.js';
import {createAPI} from './api.js';
import {AuthorizationStatus} from './const/const.js';
import ActionCreator from './reducers/user/action-creator.js';

import PageError from './components/page-error/page-error.jsx';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.changeAuthorizationStatus(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const rootElement = document.getElementById(`root`);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadOffers());
store.dispatch(UserOperation.getAuthorizationStatus());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,

    rootElement
);
