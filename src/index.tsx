import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './components/app/app';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer.js';
import {Operation as DataOperation} from './reducers/data/operation.js';
import {Operation as UserOperation} from './reducers/user/operation.js';
import {createAPI} from './api.js';
import {AuthorizationStatus, ServerError} from './const/const';
import UserActionCreator from './reducers/user/action-creator.js';
import AppActionCreator from './reducers/app/action-creator.js';
import {getPageError} from './reducers/app/selectors.js';
import {composeWithDevTools} from 'redux-devtools-extension';

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
    .catch(() => null)
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
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

loadData();

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,

    rootElement
);
