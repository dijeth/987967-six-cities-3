import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as leaflet from 'leaflet';
import {OffersMap} from './offers-map';
import {coord} from '../../types';

const props = {
    zoom: 16,
    activeCoord: null,
    centerCoord: [52.38333, 4.9] as coord,
    offersCoord: [
      [52.359385, 4.879898],
      [52.353995, 4.911789],
      [52.377303, 4.903075]
    ] as Array<coord>,
  };
  
describe(`Changes pins on the map when user changes city/activeOffer`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);
  const offersMap = Enzyme.mount(<OffersMap {...props} />, {attachTo: div});

  it(`should add 3 blue when map is first loaded`, () => {
    expect(leaflet.Layer.addTo).toHaveBeenCalledTimes(3);
    expect(leaflet.LayerGroup.clearLayers).toHaveBeenCalledTimes(1);
  });

  it(`should add 1 more pin and not remove any pins when mouse enter in activeOffer`, () => {
    offersMap.setProps({activeCoord: [52.377304, 4.903076] as coord});
    expect(leaflet.Layer.addTo).toHaveBeenCalledTimes(4);
    expect(leaflet.LayerGroup.clearLayers).toHaveBeenCalledTimes(1);
  });

  it(`should add 3 more pins (3 offers) and remove old 4 pins when city has been changed`, () => {
    offersMap.setProps({centerCoord: [11, 12], activeCoord: null, offersCoord: [[1, 2], [3, 4]] as Array<coord>});
    expect(leaflet.Layer.addTo).toHaveBeenCalledTimes(6);
    expect(leaflet.LayerGroup.clearLayers).toHaveBeenCalledTimes(2);
    expect(leaflet.Layer.remove).toHaveBeenCalledTimes(1);
});

it(`should add 1 more pin and not remove any pins (mouse enter in activeOffer)`, () => {
    offersMap.setProps({activeCoord: [13, 14]});
    expect(leaflet.Layer.addTo).toHaveBeenCalledTimes(7);
    expect(leaflet.LayerGroup.clearLayers).toHaveBeenCalledTimes(2);
    expect(leaflet.Layer.remove).toHaveBeenCalledTimes(1);
  });
});
