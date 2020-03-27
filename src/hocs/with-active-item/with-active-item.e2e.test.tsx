import * as React from 'react';
import * as Enzyme from 'enzyme';
import withActiveItem from './with-active-item';
import {List} from '../../interfaces';
import {SortType, SORT_LIST} from '../../const/const';

const ListComponent: React.FC<List<SortType>> = ({onListClick, items}) => {
  return (
    <ul onClick={onListClick}>
      <li><header>{items[0]}</header><p>Text-0</p></li>
      <li><header>{items[1]}</header><p>Text-1</p></li>
      <li><header>{items[2]}</header><p>Text-2</p></li>
      <li><header>{items[3]}</header><p>Text-3</p></li>
      <li><header>{items[4]}</header><p>Text-4</p></li>
    </ul>);
};

const items = SORT_LIST;

const ListComponentWithActiveItem = withActiveItem(ListComponent, `header`);
const handleActiveItemChange = jest.fn();

it(`should not call onActiveItemChange when click on <ul>`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const tree = Enzyme.mount(
      <ListComponentWithActiveItem
        items={items}
        onActiveItemChange={handleActiveItemChange}
        onListClick={() => undefined}
        activeItem={null}
      />, {attachTo: div});

  tree.simulate(`click`);
  expect(handleActiveItemChange).toHaveBeenCalledTimes(0);
  expect(tree.find(`li`).at(1).hasClass(`active`)).toBe(false);
});

it(`should not call onActiveItemChange when click on <li>`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const tree = Enzyme.mount(
      <ListComponentWithActiveItem
        items={items}
        onActiveItemChange={handleActiveItemChange}
        onListClick={() => undefined}
        activeItem={null}
      />, {attachTo: div});
  const secondLi = tree.find(`li`).at(1);

  secondLi.simulate(`click`);

  expect(handleActiveItemChange).toHaveBeenCalledTimes(0);
  expect(tree.find(`li`).at(1).hasClass(`active`)).toBe(false);
});

it(`should call onActiveItemChange when click on second <header> with header-1`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const tree = Enzyme.mount(
      <ListComponentWithActiveItem
        items={items}
        onActiveItemChange={handleActiveItemChange}
        onListClick={() => undefined}
        activeItem={null}
      />, {attachTo: div});
  const secondLi = tree.find(`li`).at(1);
  const secondHeader = secondLi.find(`header`);

  secondHeader.simulate(`click`);

  expect(handleActiveItemChange).toHaveBeenCalledTimes(1);
  expect(handleActiveItemChange).toHaveBeenCalledWith(items[1]);
});
