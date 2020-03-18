import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageError from './page-error.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

it(`<PageError /> should be rendered correctly`, () => {
  const tree = Enzyme.mount(<PageError message="Error" onClose={()=>{}} />);

  expect(tree.getDOMNode()).toMatchSnapshot();
})
