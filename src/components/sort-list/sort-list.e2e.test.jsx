import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SortList, SORT_LIST} from './sort-list.jsx';
import {SortType} from '../../const.js';

Enzyme.configure({
  adapter: new Adapter()
});

it(`should call onSortTypeChange and pass a sortType`, () => {
  const handleTypeChange = jest.fn();

  const tree = Enzyme.shallow(
      <SortList
        activeType={SortType.POPULAR}
        onSortTypeChange={handleTypeChange}
        onViewChange={() => {}}
        isOpen={true}
      />);

  const secondItem = tree.find(`li`).at(1);
  secondItem.simulate(`click`);

  expect(handleTypeChange).toHaveBeenCalledTimes(1);
  expect(handleTypeChange).toHaveBeenCalledWith(SORT_LIST[1]);
});

it(`should call onViewChange`, () => {
  const handleViewChange = jest.fn();

  const tree = Enzyme.shallow(
      <SortList
        activeType={SortType.POPULAR}
        onSortTypeChange={() => {}}
        onViewChange={handleViewChange}
        isOpen={true}
      />);

  tree.find(`.places__sorting-type`).simulate(`click`);

  expect(handleViewChange).toHaveBeenCalledTimes(1);
});
