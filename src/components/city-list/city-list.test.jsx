import React from 'react';
import renderer from 'react-test-renderer';
import {CityList} from './city-list.jsx';

const props = {
  items: [{
    zoom: 1,
    name: `city1`
  }, {
    zoom: 1,
    name: `city2`
  }, {
    zoom: 1,
    name: `city3`
  }, {
    zoom: 1,
    name: `city4`
  }, {
    zoom: 1,
    name: `city5`
  }],
  activeItem: {
    zoom: 1,
    name: `city2`
  },
  onChangeActiveCity: () => {}
};

it(`<CityList /> should be render correctly`, () => {
  const cityList = renderer.create(
      <CityList {...props}/>).toJSON();

  expect(cityList).toMatchSnapshot();
});
