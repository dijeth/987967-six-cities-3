import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

const ZOOM = 13;
const ICON_SIZE = [30, 30];

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: ICON_SIZE
});

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapWrapper = React.createRef();
  }

  componentDidMount() {
    const {centerCoord, offersCoord} = this.props;

    this._map = leaflet.map(this._mapWrapper.current, {
      center: centerCoord,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
          })
      .addTo(this._map);

    this._setView(centerCoord);
    this._addOffers(offersCoord);
  }

  componentWillUnmount() {
    this._map.remove();
  }

  _setView(coords) {
    this._map.setView(coords, ZOOM);
  }

  _addOffers(offersCoords) {
    offersCoords.forEach((offerCoords) => {
      leaflet.marker(offerCoords, {ICON}).addTo(this._map);
    });
  }

  render() {
    return (
      <section className='cities__map map' style={{background: `none`}}>
        <div id='map' style={{height: `100%`}} ref={this._mapWrapper}></div>
      </section>);
  }
}

Map.propTypes = {
  centerCoord: PropTypes.arrayOf(PropTypes.number),
  offersCoord: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
};

export default Map;
