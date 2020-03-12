import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import withPathName from './with-pathname.jsx';
import NameSpace from '../../reducers/name-space.js';

const mockStore = configureStore([]);
const Component = () => <div></div>;
const ComponentWithPathName = withPathName(Component);

it(`should call onActiveOfferChange once with the recived ID when pathID !== activeOfferID`, () => {
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
  expect(triggeredActions).toHaveLength(1);
  expect(triggeredActions[0]).toEqual({type: `CHANGE_ACTIVE_OFFER`, payload: `2`});
});

it(`should not call onActiveOfferChange when pathID === activeOfferID`, () => {
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
