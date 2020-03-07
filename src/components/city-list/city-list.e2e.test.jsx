import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CityList} from './city-list.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const props = {
  items: [
    {name: `city1`, centerCoord: [1, 2]},
    {name: `city2`, centerCoord: [1, 2]},
    {name: `city3`, centerCoord: [1, 2]},
    {name: `city4`, centerCoord: [1, 2]},
    {name: `city5`, centerCoord: [1, 2]}
  ],
  activeItem: {name: `city1`, centerCoord: [1, 2]},
  onListClick: jest.fn()
};

it(`should call onListClick when mouse click`, () => {
  const cityList = mount(<CityList {...props} />);
  const item = cityList.find(`span`).at(3);
  item.simulate(`click`, {preventDefault: () => {}});

  expect(props.onListClick).toHaveBeenCalledTimes(1);
});
