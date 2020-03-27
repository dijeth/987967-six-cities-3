import * as React from 'react';
import * as Enzyme from 'enzyme';
import withOpenState from './with-open-state';


const Component = ({onViewChange}) => (<div onClick={onViewChange}></div>);

type Props = {
  onViewChange: () => void;
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
