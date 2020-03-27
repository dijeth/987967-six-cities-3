import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {CityList} from './city-list';
import {City} from '../../interfaces';

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
  onActiveItemChange: () => undefined,
  onListClick: () => undefined,
};

it(`<CityList /> should be render correctly`, () => {
  const cityList = renderer.create(
      <CityList {...props}/>).toJSON();

  expect(cityList).toMatchSnapshot();
});
