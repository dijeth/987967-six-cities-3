import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import withLoading from './with-loading.jsx';
import NameSpace from '../../reducers/name-space.js';

const mockStore = configureStore([]);
const Component = () => <div>Mock</div>;
const ComponentWithLoading = withLoading(Component);

it(`should render "Loading..." when "loading" === 1`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      loading: 1
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <ComponentWithLoading />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`should render Component when loading === 0`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      loading: 0
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <ComponentWithLoading />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
