const leaflet = jest.genMockFromModule(`leaflet`);

const LayerGroup = {
  addTo() {
    return this
  },

  clearLayers: jest.fn()
};

const LayerMarker = {
  addTo: jest.fn(() => {
    return LayerMarker
  }),

  remove: jest.fn()
};

leaflet.marker = () => LayerMarker;
leaflet.layerGroup = () => LayerGroup;

leaflet.icon = () => {};

leaflet.map = () => ({
  setView: () => {},
});

leaflet.tileLayer = () => ({
  addTo: () => {},
});

leaflet.Layer = LayerMarker;
leaflet.LayerGroup = LayerGroup;
module.exports = leaflet;
