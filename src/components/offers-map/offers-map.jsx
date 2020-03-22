import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {isEqualCoords} from '../../util.js';
import {connect} from 'react-redux';
import {getActiveOfferCoord} from '../../reducers/app/selectors.js';

const ICON_SIZE = [27, 39];

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: ICON_SIZE
});

const ICON_ACTIVE = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: ICON_SIZE
});

class OffersMap extends PureComponent {
  constructor(props) {
    super(props);

    this._centerCoord = null;
    this._activeCoord = null;
    this._offersCoord = [];
    this._activeLayer = null;
    this._offerLayers = [];

    this._mapWrapper = React.createRef();
  }

  componentDidMount() {
    const {centerCoord, offersCoord, activeCoord, zoom} = this.props;

    this._mapWrapper.current.style.height = `100%`;

    this._map = leaflet.map(this._mapWrapper.current, {
      center: centerCoord,
      zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
          })
      .addTo(this._map);

    this._setView(centerCoord, zoom);

    this._centerCoord = centerCoord;
    this._updateOffers(offersCoord);
    this._updateActiveCoord(activeCoord);
  }

  componentDidUpdate() {
    const {centerCoord, offersCoord, activeCoord, zoom} = this.props;

    if (this._shouldOfferMarkersBeChanged(centerCoord, offersCoord)) {
      this._centerCoord = centerCoord;

      this._setView(centerCoord, zoom);
      this._updateOffers(offersCoord);
    }

    this._updateActiveCoord(activeCoord);
  }

  componentWillUnmount() {
    this._map.remove();
  }

  _shouldOfferMarkersBeChanged(centerCoord, offersCoord) {
    if (!isEqualCoords(centerCoord, this._centerCoord)) {
      return true;
    }

    if (offersCoord.length !== this._offersCoord.length) {
      return true;
    }

    if (offersCoord.filter((it, i) => !isEqualCoords(it, this._offersCoord[i])).length) {
      return true;
    }

    return false;
  }

  _setView(coords, zoom) {
    this._map.setView(coords, zoom);
  }

  _addOffers(offersCoord) {
    this._offersCoord = offersCoord;
    return offersCoord.map((coord) => leaflet.marker(coord, {icon: ICON}).addTo(this._map));
  }

  _updateOffers(offersCoord) {
    this._offerLayers.forEach((it) => {
      this._map.removeLayer(it);
    });

    this._offerLayers = null;
    this._offerLayers = this._addOffers(offersCoord);
  }

  _updateActiveCoord(coord) {
    if (this._activeLayer !== null) {
      this._map.removeLayer(this._activeLayer);
      this._activeLayer = null;
    }

    if (coord) {
      this._activeLayer = leaflet.marker(coord, {icon: ICON_ACTIVE}).addTo(this._map);
    }
  }

  render() {
    return <div id='map' ref={this._mapWrapper}></div>;
  }
}

const mapStateToProps = (state) => ({
  activeCoord: getActiveOfferCoord(state)
});

OffersMap.propTypes = {
  centerCoord: PropTypes.arrayOf(PropTypes.number).isRequired,
  offersCoord: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  activeCoord: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number
};

export {OffersMap};
export default connect(mapStateToProps)(OffersMap);
