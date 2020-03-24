import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import PageError from './page-error';

Enzyme.configure({
  adapter: new Adapter()
});

it(`<PageError /> should be rendered correctly`, () => {
  const tree = Enzyme.mount(<PageError message="Error" onClose={()=>{}} />);

  expect(tree.getDOMNode()).toMatchSnapshot();
});
