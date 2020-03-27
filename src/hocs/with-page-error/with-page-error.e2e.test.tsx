import * as React from 'react';
import * as Enzyme from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import withPageError from './with-page-error';
import NameSpace from '../../reducers/name-space.js';

const mockStore = configureStore([]);
const Component = () => <div>Mock</div>;
const ComponentWithPageError = withPageError(Component);

it(`should clear error message in store when user click to button`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      pageError: `Error`
    }
  });

  const tree = Enzyme.mount(
      <Provider store={store}>
        <ComponentWithPageError />
      </Provider>
  );

  const button = tree.find(`button`);

  button.simulate(`click`);
  expect(store.getActions()).toEqual([{type: `SET_PAGE_ERROR`, payload: ``}]);
});
