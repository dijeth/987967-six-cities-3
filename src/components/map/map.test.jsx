import React from 'react';
import Enzyme, {mount, render} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Map from './map.jsx';

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

it(`<Map /> should be render correctly with activeCoord`, () => {
  const div = global.document.createElement(`div`);
  global.document.body.appendChild(div);

  const map = mount(<Map {...props} />, {attachTo: div});


// console.log(map.find(`.leaflet-marker-icon`))
// expect(map.find(`.leaflet-marker-icon`)).toHaveLength(4)
  expect(toJson(map, {mode: `shallow`})).toMatchSnapshot();
});


// props.activeCoord = null;

// it(`<Map /> should be render correctly without activeCoord`, () => {
//   const div = global.document.createElement(`div`);
//   global.document.body.appendChild(div);

//   const map = mount(<Map {...props} />, {attachTo: div});

//   expect(toJson(map)).toMatchSnapshot();
// });


