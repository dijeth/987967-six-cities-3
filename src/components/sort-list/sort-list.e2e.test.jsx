import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SortList} from './sort-list.jsx';
import {SortType, SORT_LIST} from '../../const/const.js';

Enzyme.configure({
  adapter: new Adapter()
});

it(`should call onListClick and onViewChange`, () => {
  const handleTypeChange = jest.fn();
  const handleViewChange = jest.fn();

  const tree = Enzyme.shallow(
      <SortList
        items={SORT_LIST}
        activeItem={SortType.POPULAR}
        onListClick={handleTypeChange}
        onViewChange={handleViewChange}
        isOpen={true}
      />);

  tree.find(`ul`).simulate(`click`);

  expect(handleTypeChange).toHaveBeenCalledTimes(1);
  expect(handleViewChange).toHaveBeenCalledTimes(1);
});

it(`should call onViewChange`, () => {
  const handleViewChange = jest.fn();

  const tree = Enzyme.shallow(
      <SortList
        items={SORT_LIST}
        activeItem={SortType.POPULAR}
        onViewChange={handleViewChange}
        isOpen={true}
      />);

  tree.find(`.places__sorting-type`).simulate(`click`);

  expect(handleViewChange).toHaveBeenCalledTimes(1);
});
