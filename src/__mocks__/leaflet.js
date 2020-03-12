const leaflet = jest.genMockFromModule(`leaflet`);

leaflet.fn = {
  addLayer: jest.fn(),
  removeLayer: jest.fn()
};

leaflet.icon = () => {};

leaflet.map = () => {
  return {
    setView: () => {},
    remove: () => {},
    removeLayer: leaflet.fn.removeLayer,
  };
};

leaflet.marker = () => {
  return {
    addTo: leaflet.fn.addLayer,
  };
};

leaflet.tileLayer = () => {
  return {
    addTo: () => {},
  };
};

module.exports = leaflet;
