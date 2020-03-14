import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {createAPI} from '../../api.js';
import MockAdapter from 'axios-mock-adapter';
import withPathName, {handleActiveOfferChange} from './with-pathname.jsx';
import NameSpace from '../../reducers/name-space.js';

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);
apiMock.onGet(`/hotels/2/nearby`).reply(200, []);
apiMock.onGet(`/comments/2`).reply(200, []);

const mockStore = configureStore([thunk.withExtraArgument(api)]);
const Component = () => <div></div>;
const ComponentWithPathName = withPathName(Component);

it(`should pass CHANGE_ACTIVE_OFFER with payload pathID pathID !== activeOfferID`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      activeOffer: `1`
    }
  });

  renderer.create(
      <Provider store={store}>
        <ComponentWithPathName
          pathID="2"
        />
      </Provider>);

  const triggeredActions = store.getActions();
  expect(triggeredActions).toHaveLength(2);
  expect(triggeredActions[0]).toEqual({type: `CHANGE_ACTIVE_OFFER`, payload: `2`});
});

it(`should not pass any actions when pathID === activeOfferID`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      activeOffer: `1`
    }
  });

  renderer.create(
      <Provider store={store}>
        <ComponentWithPathName
          pathID="1"
        />
      </Provider>);

  const triggeredActions = store.getActions();
  expect(triggeredActions).toHaveLength(0);
});

it(`should pass a correct set of actions when pathID !== activeOfferID`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      activeOffer: `1`
    }
  });

  handleActiveOfferChange(store.dispatch, `2`)
    .then(() => {
      const triggeredActions = store.getActions();
      expect(triggeredActions).toEqual([
        {type: `CHANGE_ACTIVE_OFFER`, payload: `2`},
        {type: `CHANGE_LOADING_STATUS`, payload: true},
        {type: `LOAD_NEARBY`, payload: []},
        {type: `LOAD_COMMENTS`, payload: []},
        {type: `CHANGE_LOADING_STATUS`, payload: false}
      ]);
    });
});
