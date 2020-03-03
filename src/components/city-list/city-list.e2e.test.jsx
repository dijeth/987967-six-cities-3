import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CityList} from './city-list.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const props = {
  items: [`city1`, `city2`, `city3`, `city4`, `city5`],
  activeItem: `city1`,
  onListClick: jest.fn()
};

it(`should call onListClick when mouse click`, () => {
  const cityList = mount(<CityList {...props} />);
  const item = cityList.find(`span`).at(3);
  item.simulate(`click`, {preventDefault: () => {}});

  expect(props.onListClick).toHaveBeenCalledTimes(1);
});
