import * as React from 'react';
import * as leaflet from 'leaflet';
import {isEqualCoords} from '../../util.js';
import {connect} from 'react-redux';
import {getActiveOfferCoord} from '../../reducers/app/selectors.js';
import { coord } from '../../types.js';

const ICON_SIZE = [27, 39];

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: ICON_SIZE
});

const ICON_ACTIVE = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: ICON_SIZE
});

type Props = {
  centerCoord: coord;
  offersCoord: Array<coord>;
  activeCoord: coord;
  zoom: number;
};

class OffersMap extends React.PureComponent<Props> {
  private centerCoord: coord | null;
  private activeCoord: coord | null;
  private offersCoord: Array<coord>;
  private activeLayer: leaflet.LayerGroup;
  private offerLayers: Array<leaflet.LayerGroup>;
  private mapWrapper: React.RefObject<HTMLDivElement>;
  private map: leaflet.Map;

  constructor(props) {
    super(props);

    this.centerCoord = null;
    this.activeCoord = null;
    this.offersCoord = [];
    this.activeLayer = null;
    this.offerLayers = [];

    this.mapWrapper = React.createRef();
  }

  componentDidMount() {
    const {centerCoord, offersCoord, activeCoord, zoom} = this.props;

    this.mapWrapper.current.style.height = `100%`;

    this.map = leaflet.map(this.mapWrapper.current, {
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
      .addTo(this.map);

    this.setView(centerCoord, zoom);

    this.centerCoord = centerCoord;
    this.updateOffers(offersCoord);
    this.updateActiveCoord(activeCoord);
  }

  componentDidUpdate() {
    const {centerCoord, offersCoord, activeCoord, zoom} = this.props;

    if (this.shouldOfferMarkersBeChanged(centerCoord, offersCoord)) {
      this.centerCoord = centerCoord;

      this.setView(centerCoord, zoom);
      this.updateOffers(offersCoord);
    }

    this.updateActiveCoord(activeCoord);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  shouldOfferMarkersBeChanged(centerCoord, offersCoord) {
    if (!isEqualCoords(centerCoord, this.centerCoord)) {
      return true;
    }

    if (offersCoord.length !== this.offersCoord.length) {
      return true;
    }

    if (offersCoord.filter((it, i) => !isEqualCoords(it, this.offersCoord[i])).length) {
      return true;
    }

    return false;
  }

  setView(coords, zoom) {
    this.map.setView(coords, zoom);
  }

  addOffers(offersCoord) {
    this.offersCoord = offersCoord;
    return offersCoord.map((coord) => leaflet.marker(coord, {icon: ICON}).addTo(this.map));
  }

  updateOffers(offersCoord) {
    this.offerLayers.forEach((it) => {
      this.map.removeLayer(it);
    });

    this.offerLayers = null;
    this.offerLayers = this.addOffers(offersCoord);
  }

  updateActiveCoord(coord) {
    if (this.activeLayer !== null) {
      this.map.removeLayer(this.activeLayer);
      this.activeLayer = null;
    }

    if (coord) {
      this.activeLayer = leaflet.marker(coord, {icon: ICON_ACTIVE}).addTo(this.map);
    }
  }

  render() {
    return <div id='map' ref={this.mapWrapper}></div>;
  }
}

const mapStateToProps = (state) => ({
  activeCoord: getActiveOfferCoord(state)
});

export {OffersMap};
export default connect(mapStateToProps)(OffersMap);
