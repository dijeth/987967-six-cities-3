import React from 'react';
import renderer from 'react-test-renderer';
import {SortList} from './sort-list.jsx';
import {SortType} from '../../const.js';

it(`<SortList /> should be correctly rendered when opened`, () => {
	const tree = renderer.create(
		<SortList
			activeType={SortType.POPULAR}
			onSortTypeChange={() => {}}
			onViewChange={() => {}}
			isOpen={true}
		/>);
  expect(tree.toJSON()).toMatchSnapshot();
}); 

it(`<SortList /> should be correctly rendered when closed`, () => {
	const tree = renderer.create(
		<SortList
			activeType={SortType.POPULAR}
			onSortTypeChange={() => {}}
			onViewChange={() => {}}
			isOpen={false}
		/>);
  expect(tree.toJSON()).toMatchSnapshot();
}); 

