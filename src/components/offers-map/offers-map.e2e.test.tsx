import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OffersMap} from './offers-map';
import leaflet from 'leaflet';

Enzyme.configure({
  adapter: new Adapter()
});

const props = {
  centerCoord: [1, 2],
  activeCoord: null,
  offersCoord: [[3, 4], [5, 6], [7, 8]]
};

describe(`Changes pins on the map when user changes city/activeOffer`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);
  const offersMap = mount(<OffersMap {...props} />, {attachTo: div});

  it(`should add 3 blue pins and not remove any pins (map first loaded)`, () => {
    expect(leaflet.fn.addLayer).toHaveBeenCalledTimes(3);
    expect(leaflet.fn.removeLayer).toHaveBeenCalledTimes(0);
  });

  it(`should add 1 more pin and not remove any pins (mouse enter in activeOffer)`, () => {
    offersMap.setProps({activeCoord: [9, 10]});
    expect(leaflet.fn.addLayer).toHaveBeenCalledTimes(4);
    expect(leaflet.fn.removeLayer).toHaveBeenCalledTimes(0);
  });

  it(`should add 3 more pins (3 offers) and remove old 4 pins (city have been changed)	`, () => {
    offersMap.setProps({centerCoord: [11, 12], activeCoord: null});
    expect(leaflet.fn.addLayer).toHaveBeenCalledTimes(7);
    expect(leaflet.fn.removeLayer).toHaveBeenCalledTimes(4);
  });

  it(`should add 1 more pin and not remove any pins (mouse enter in activeOffer)`, () => {
    offersMap.setProps({activeCoord: [13, 14]});
    expect(leaflet.fn.addLayer).toHaveBeenCalledTimes(8);
    expect(leaflet.fn.removeLayer).toHaveBeenCalledTimes(4);
  });

  it(`should not add any pins and remove 4 pins (city have been changed and offers is empty)`, () => {
    offersMap.setProps({centerCoord: [15, 16], activeCoord: null, offersCoord: []});
    expect(leaflet.fn.addLayer).toHaveBeenCalledTimes(8);
    expect(leaflet.fn.removeLayer).toHaveBeenCalledTimes(8);
  });
});
