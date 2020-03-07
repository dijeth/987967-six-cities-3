import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {withSort} from './with-sort.jsx';
import {SortType} from '../../const/const.js';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import PropTypes from 'prop-types';
import NameSpace from '../../reducers/name-space.js';

Enzyme.configure({
  adapter: new Adapter()
});

const mockStore = configureStore([]);
const Component = () => <div></div>;

Component.propTypes = {
  sortType: PropTypes.string,
  offers: PropTypes.array,
  activeCity: PropTypes.object
};

const ComponentWithSort = withSort(Component);

const offers = [
  {id: `0`, city: `city1`, rating: 0},
  {id: `1`, city: `city2`, rating: 1},
  {id: `2`, city: `city2`, rating: 2},
  {id: `3`, city: `city1`, rating: 3},
  {id: `4`, city: `city1`, rating: 4},
  {id: `5`, city: `city2`, rating: 5},
  {id: `6`, city: `city3`, rating: 6},
  {id: `7`, city: `city4`, rating: 7}
];

const store = mockStore({
  [NameSpace.DATA]: {offers},
  [NameSpace.APP]: {
    sortType: SortType.TOP_RATED_FIRST,
    activeCity: {name: `city1`}
  }
});

it(`should select and sort elements using values from store `, () => {
  const tree = Enzyme.mount(<Provider store={store}><ComponentWithSort /></Provider>);
  expect(tree.childAt(0).childAt(0).children().prop(`offers`)).toEqual([
    {id: `4`, city: `city1`, rating: 4},
    {id: `3`, city: `city1`, rating: 3},
    {id: `0`, city: `city1`, rating: 0}
  ]);
});
