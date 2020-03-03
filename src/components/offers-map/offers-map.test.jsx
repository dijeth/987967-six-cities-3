import React from 'react';
import Enzyme, {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import {OffersMap} from './offers-map.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

const props = {
  centerCoord: [52.38333, 4.9],
  offersCoord: [
    [52.359385, 4.879898],
    [52.353995, 4.911789],
    [52.377303, 4.903075]
  ],
  activeCoord: [52.377304, 4.903076]
};

it(`<OffersMap /> should be render correctly with activeCoord`, () => {
  const div = global.document.createElement(`div`);
  global.document.body.appendChild(div);

  const map = mount(<OffersMap {...props} />, {attachTo: div});
  expect(toJson(map, {mode: `shallow`})).toMatchSnapshot();
});


