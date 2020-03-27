import * as React from 'react';
import * as Enzyme from 'enzyme';
import {OffersMap} from './offers-map';
import {coord} from '../../types';

const mockFn = {
  clearLayers: jest.fn(),
  addLayer: jest.fn(() => ({remove: mockFn.removeLayer})),
  marker: jest.fn(() => ({addTo: mockFn.addLayer})),
  setView: jest.fn(),
  removeLayer: jest.fn(),
};

jest.mock(`leaflet`, () => ({
  icon: () => undefined,
  map: () => ({setView: mockFn.setView}),
  tileLayer: () => ({addTo: () => undefined}),
  layerGroup: () => ({
    addTo: () => ({clearLayers: mockFn.clearLayers})
  }),
  marker: (arg) => mockFn.marker(arg)
}));

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
    expect(mockFn.clearLayers).toHaveBeenCalledTimes(1);

    expect(mockFn.addLayer).toHaveBeenCalledTimes(3);
    expect(mockFn.marker).toHaveBeenNthCalledWith(1, [52.359385, 4.879898]);
    expect(mockFn.marker).toHaveBeenNthCalledWith(2, [52.353995, 4.911789]);
    expect(mockFn.marker).toHaveBeenNthCalledWith(3, [52.377303, 4.903075]);

    expect(mockFn.setView).toHaveBeenCalledTimes(1);
    expect(mockFn.setView).toHaveBeenNthCalledWith(1, [52.38333, 4.9], 16);
  });

  it(`should add 1 more pin and not remove any pins when mouse enter in activeOffer`, () => {
    offersMap.setProps({activeCoord: [52.377304, 4.903076] as coord});

    expect(mockFn.addLayer).toHaveBeenCalledTimes(4);
    expect(mockFn.marker).toHaveBeenNthCalledWith(4, [52.377304, 4.903076]);

    expect(mockFn.clearLayers).toHaveBeenCalledTimes(1);
    expect(mockFn.setView).toHaveBeenCalledTimes(1);
  });

  it(`should add 2 more pins (2 offers) and remove old 4 pins when city has been changed`, () => {
    offersMap.setProps({
      centerCoord: [11, 12],
      activeCoord: null,
      offersCoord: [[1, 2], [3, 4]] as Array<coord>
    });

    expect(mockFn.clearLayers).toHaveBeenCalledTimes(2);

    expect(mockFn.removeLayer).toHaveBeenCalledTimes(1);

    expect(mockFn.addLayer).toHaveBeenCalledTimes(4 + 2);
    expect(mockFn.marker).toHaveBeenNthCalledWith(5, [1, 2]);
    expect(mockFn.marker).toHaveBeenNthCalledWith(6, [3, 4]);

    expect(mockFn.setView).toHaveBeenCalledTimes(2);
    expect(mockFn.setView).toHaveBeenNthCalledWith(2, [11, 12], 16);

  });
});
