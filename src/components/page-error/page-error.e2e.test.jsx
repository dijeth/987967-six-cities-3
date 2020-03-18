import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageError from './page-error.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

it(`<PageError /> should call onClose callback`, () => {
	const handleClose = jest.fn();
  const tree = Enzyme.mount(<PageError message="Error" onClose={handleClose} />);
  tree.find(`button`).simulate(`click`);
  expect(handleClose).toHaveBeenCalledTimes(1);
})
