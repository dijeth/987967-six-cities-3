import React from 'react';
import renderer from 'react-test-renderer';
import {SortList} from './sort-list.jsx';
import {SortType} from '../../const.js';

const tree = renderer.create(<SortList />);

it(`<SortList /> should be correctly rendered when closed`, () => {
  expect(tree.toJSON()).toMatchShanshot();
});

