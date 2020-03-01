import React from 'react';
import PropTypes from 'prop-types';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withOpenState from './with-open-state.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const Component = ({onViewChange}) => (<div onClick={onViewChange}></div>);

Component.propTypes = {
  onViewChange: PropTypes.func
};

const ComponentWithOpenState = withOpenState(Component);

const tree = Enzyme.mount(<ComponentWithOpenState />);

it(`should has prop isOpen with false`, () => {
  expect(tree.state(`isOpen`)).toBe(false);
});

it(`should has prop isOpen with true`, () => {
  tree.simulate(`click`);
  expect(tree.state(`isOpen`)).toBe(true);
});
