import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { centerCoords } = this.props;

    const zoom = 12;
    this._map = leaflet.map(`map`, {
      center: centerCoords,
      zoom: zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView(centerCoords, zoom);

    leaflet
      .tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        })
      .addTo(this._map);
  }

  componentWillUnmount() {
    this._map.remove()
  }

  render() {
    return (
      <section className='cities__map map' style={{background: `none`}}>
        <div id='map' style={{height: `100%`}}></div>
      </section>)
    }
  };

  Map.propTypes = {
    centerCoords: PropTypes.arrayOf(PropTypes.number),
    currentOffer: PropTypes.arrayOf(PropTypes.number),
    nearOffers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  }

  export default Map;
