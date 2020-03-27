import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';
import {PageSignIn} from './page-sign-in';
import NameSpace from '../../reducers/name-space.js';

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.USER]: {
    isAuthorized: false
  }
});

describe(`<PageSignIn /> snapshot test`, () => {
  it(`should be rendered correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <PageSignIn onSubmit={() => {}} />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
