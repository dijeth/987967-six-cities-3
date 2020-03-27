import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {SortList} from './sort-list';
import {SortType, SORT_LIST} from '../../const/const';

it(`<SortList /> should be correctly rendered when opened`, () => {
  const tree = renderer.create(
      <SortList
        items={SORT_LIST}
        activeItem={SortType.POPULAR}
        onActiveItemChange={() => undefined}
        onListClick={() => undefined}
        onViewChange={() => undefined}
        isOpen={true}
      />);
  expect(tree.toJSON()).toMatchSnapshot();
});

it(`<SortList /> should be correctly rendered when closed`, () => {
  const tree = renderer.create(
      <SortList
        items={SORT_LIST}
        activeItem={SortType.POPULAR}
        onActiveItemChange={() => undefined}
        onListClick={() => undefined}
        onViewChange={() => undefined}
        isOpen={false}
      />);
  expect(tree.toJSON()).toMatchSnapshot();
});

