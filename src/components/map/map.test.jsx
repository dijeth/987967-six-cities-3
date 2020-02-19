import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

const props = {
  centerCoord: [52.38333, 4.9],
  offersCoord: [
    [52.359385, 4.879898],
    [52.353995, 4.911789],
    [52.377303, 4.903075]
  ]
};

it(`<Map /> should be render correctly`, () => {
  const map = renderer.create(<Map {...props} />, {
    createNodeMock: () => {
      return document.createElement(`div`);
    }
  }).toJSON();

  expect(map).toMatchSnapshot();
});
