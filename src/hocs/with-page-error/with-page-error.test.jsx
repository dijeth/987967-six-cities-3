import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import withPageError from './with-page-error.jsx';
import NameSpace from '../../reducers/name-space.js';

const mockStore = configureStore([]);
const Component = () => <div>Mock</div>;
const ComponentWithPageError = withPageError(Component);

it(`should render error message when "pageError" === "Error"`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      pageError: `Error`
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <ComponentWithPageError />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`should render Component when "pageError" === ""`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      pageError: ``
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <ComponentWithPageError />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
