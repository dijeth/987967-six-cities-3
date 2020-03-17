import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer.js';
import {Operation as DataOperation} from './reducers/data/operation.js';
import {Operation as UserOperation} from './reducers/user/operation.js';
import {createAPI} from './api.js';
import {AuthorizationStatus, ServerError} from './const/const.js';
import UserActionCreator from './reducers/user/action-creator.js';
import AppActionCreator from './reducers/app/action-creator.js';
import {getPageError} from './reducers/app/selectors.js';

const UNKNOWN_ERROR = `Looks like you ran out of internet`;

const loadData = () => {
  store.dispatch(AppActionCreator.increaseLoad());
  Promise.all([
    store.dispatch(DataOperation.loadOffers()),
    store.dispatch(UserOperation.getAuthorizationStatus()),
  ])
    .then(() => {
      store.dispatch(DataOperation.updateFavorites());
    })
    .finally(() => {
      store.dispatch(AppActionCreator.decreaseLoad());
    });
};

const onFail = (response, status) => {
  if (status === ServerError.UNAUTHORIZED) {
    store.dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    return;
  }

  if (status !== null) {
    store.dispatch(AppActionCreator.setPageError(response.data.error));
    return;
  }

  const pageError = getPageError(store.getState());
  if (pageError === ``) {
    store.dispatch(AppActionCreator.setPageError(UNKNOWN_ERROR));
  }
};

const api = createAPI(onFail);

const rootElement = document.getElementById(`root`);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

loadData();

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,

    rootElement
);
