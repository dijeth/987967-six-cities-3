import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import PrivateRoute from './private-route.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`<PrivateRoute />`, () => {

  it(`should render Component when require is true`, () => {
    const tree = Enzyme.mount(
        <BrowserRouter>
          <PrivateRoute
            path="/"
            to="/dublin"
            render={() => <div>london</div>}
            require={true}
          />
        </BrowserRouter>
    );

    expect(tree.getDOMNode()).toMatchSnapshot();
  });

  it(`should render null when require is false`, () => {
    const tree = Enzyme.mount(
        <BrowserRouter>
          <PrivateRoute
            path="/"
            to="/dublin"
            render={() => <div>london</div>}
            require={false}
          />
        </BrowserRouter>
    );

    expect(tree.getDOMNode()).toMatchSnapshot();
  });
});
