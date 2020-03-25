import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {CityList} from './city-list';
import {City} from '../../interfaces';

Enzyme.configure({
  adapter: new Adapter()
});

const cities: City[] = [{
  zoom: 1,
  name: `city1`,
  centerCoord: [1, 2],
},
{
  zoom: 1,
  name: `city2`,
  centerCoord: [1, 2],
},
{
  zoom: 1,
  name: `city3`,
  centerCoord: [1, 2],
},
{
  zoom: 1,
  name: `city4`,
  centerCoord: [1, 2],
},
{
  zoom: 1,
  name: `city5`,
  centerCoord: [1, 2],
}];

const activeCity: City = {
  zoom: 1,
  name: `city2`,
  centerCoord: [1, 2],
};

const props = {
  items: cities,
  activeItem: activeCity,
  onActiveItemChange: () => {},
  onListClick: jest.fn(),
};

it(`should call onListClick when mouse click`, () => {
  const cityList = Enzyme.mount(<CityList {...props} />);
  const item = cityList.find(`span`).at(3);
  item.simulate(`click`, {preventDefault: () => {}});

  expect(props.onListClick).toHaveBeenCalledTimes(1);
});
