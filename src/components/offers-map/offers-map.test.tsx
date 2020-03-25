import * as React from 'react';
import {mount} from 'enzyme';
import {OffersMap} from './offers-map';
import { coord } from '../../types';

const centerCoord: coord = [52.38333, 4.9];
const activeCoord: coord = [52.377304, 4.903076];
const offersCoord: Array<coord> = [
  [52.359385, 4.879898],
  [52.353995, 4.911789],
  [52.377303, 4.903075]
];

const props = {
  centerCoord: centerCoord,
  offersCoord: offersCoord,
  activeCoord: activeCoord,
  zoom: 16,
};

it(`<OffersMap /> should be render correctly with activeCoord`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const map = mount(<OffersMap {...props} />, {attachTo: div});
  console.log(map.debug());
  expect(map.getDOMNode()).toMatchSnapshot();
});


