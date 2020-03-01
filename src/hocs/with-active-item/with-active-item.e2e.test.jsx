import React from 'react';
import PropTypes from 'prop-types';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const ListComponent = ({onListClick, items}) => (
  <ul onClick={onListClick}>
    <li><header>{items[0]}</header><p>Text-0</p></li>
    <li><header>{items[1]}</header><p>Text-1</p></li>
    <li><header>{items[2]}</header><p>Text-2</p></li>
    <li><header>{items[3]}</header><p>Text-3</p></li>
    <li><header>{items[4]}</header><p>Text-4</p></li>
  </ul>);

ListComponent.propTypes = {
  onListClick: PropTypes.func,
  onActiveItemChange: PropTypes.func,
  items: PropTypes.array
};

const items = [
  `header-0`,
  `header-1`,
  `header-2`,
  `header-3`,
  `header-4`
];

const ListComponentWithActiveItem = withActiveItem(ListComponent, `header`);
const handleActiveItemChange = jest.fn();

it(`should not call onActiveItemChange when click on <ul>`, () => {
  const div = global.document.createElement(`div`);
  global.document.body.appendChild(div);

  const tree = Enzyme.mount(<ListComponentWithActiveItem items={items} onActiveItemChange={handleActiveItemChange} />, {attachTo: div});

  tree.simulate(`click`);
  expect(handleActiveItemChange).toHaveBeenCalledTimes(0);
  expect(tree.find(`li`).at(1).hasClass(`active`)).toBe(false);
});

it(`should not call onActiveItemChange when click on <li>`, () => {
  const div = global.document.createElement(`div`);
  global.document.body.appendChild(div);

  const tree = Enzyme.mount(<ListComponentWithActiveItem items={items} onActiveItemChange={handleActiveItemChange} />, {attachTo: div});
  const secondLi = tree.find(`li`).at(1);

  secondLi.simulate(`click`);

  expect(handleActiveItemChange).toHaveBeenCalledTimes(0);
  expect(tree.find(`li`).at(1).hasClass(`active`)).toBe(false);
});

it(`should call onActiveItemChange when click on second <header> with header-1`, () => {
  const div = global.document.createElement(`div`);
  global.document.body.appendChild(div);

  const tree = Enzyme.mount(<ListComponentWithActiveItem items={items} onActiveItemChange={handleActiveItemChange} />, {attachTo: div});
  const secondLi = tree.find(`li`).at(1);
  const secondHeader = secondLi.find(`header`);

  secondHeader.simulate(`click`);

  expect(handleActiveItemChange).toHaveBeenCalledTimes(1);
  expect(handleActiveItemChange).toHaveBeenCalledWith(items[1]);
});
