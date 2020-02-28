import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SortList, SORT_LIST} from './sort-list.jsx';
import {SortType} from '../../const.js';

Enzyme.configure({
  adapter: new Adapter()
});

it(`should call onListClick and onViewChange`, () => {
  const handleTypeChange = jest.fn();
  const handleViewChange = jest.fn();

  const tree = Enzyme.shallow(
      <SortList
        activeItem={0}
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
        activeItem={0}
        onViewChange={handleViewChange}
        isOpen={true}
      />);

  tree.find(`.places__sorting-type`).simulate(`click`);

  expect(handleViewChange).toHaveBeenCalledTimes(1);
});
