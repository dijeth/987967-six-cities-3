import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CityList} from './city-list.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const props = {
  cities: [`city1`, `city2`, `city3`, `city4`, `city5`],
  activeCity: 1,
  onChangeActiveCity: jest.fn()
};

it(`should pass activeCity index when on mouse click`, () => {
  const cityList = mount(<CityList {...props} />);
  const item = cityList.find(`span`).at(3);
  item.simulate(`click`, {preventDefault: () => {}});

  expect(props.onChangeActiveCity).toHaveBeenCalledTimes(1);
  expect(props.onChangeActiveCity).toHaveBeenCalledWith(3);
});
