import React from 'react';
import renderer from 'react-test-renderer';
import {CityList} from './city-list.jsx';

const props = {
  cities: [`city1`, `city2`, `city3`, `city4`, `city5`],
  activeCity: 1,
  onChangeActiveCity: () => {}
};

it(`<CityList /> should be render correctly`, () => {
  const cityList = renderer.create(
      <CityList {...props}/>).toJSON();

  expect(cityList).toMatchSnapshot();
});
