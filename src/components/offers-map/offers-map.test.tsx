import * as React from 'react';
import {mount} from 'enzyme';
import {OffersMap} from './offers-map';
import {coord} from '../../types';

const props = {
  zoom: 16,
  activeCoord: [52.377304, 4.903076] as coord,
  centerCoord: [52.38333, 4.9] as coord,
  offersCoord: [
    [52.359385, 4.879898],
    [52.353995, 4.911789],
    [52.377303, 4.903075]
  ] as Array<coord>,
};

it(`<OffersMap /> should be render correctly with activeCoord`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const map = mount(<OffersMap {...props} />, {attachTo: div});
  expect(map.getDOMNode()).toMatchSnapshot();
});


