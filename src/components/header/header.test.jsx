import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Header} from './header.jsx';

describe(`<Header /> snapshot test`, () => {
  it(`should be rendered correctly when the user is not authorized`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Header
            isAuthorized={false}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should be rendered correctly when the user is authorized`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Header
            userPicture="img/user.jpg"
            email="aaa@ee.ee"
            isUserSuper={true}
            isAuthorized={true}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});