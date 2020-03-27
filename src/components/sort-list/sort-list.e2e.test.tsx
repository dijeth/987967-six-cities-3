import * as React from 'react';
import * as Enzyme from 'enzyme';
import {SortList} from './sort-list';
import {SortType, SORT_LIST} from '../../const/const';

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
        onActiveItemChange={()=>{}}
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
        onActiveItemChange={()=>{}}
        onListClick={()=>{}}
      />);

  tree.find(`.places__sorting-type`).simulate(`click`);

  expect(handleViewChange).toHaveBeenCalledTimes(1);
});
