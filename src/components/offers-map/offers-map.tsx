import * as React from 'react';
import * as leaflet from 'leaflet';
import {isEqualCoords} from '../../util.js';
import {connect} from 'react-redux';
import {getActiveOfferCoord} from '../../reducers/app/selectors.js';
import {coord} from '../../types';

const ICON_SIZE: [number, number] = [27, 39];

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: ICON_SIZE
});

const ICON_ACTIVE = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: ICON_SIZE
});

const LAYER_URL = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{@2x}.png`;

type Props = {
  centerCoord: coord;
  offersCoord: Array<coord>;
  activeCoord: coord;
  zoom: number;
};

class OffersMap extends React.PureComponent<Props> {
  private mapRef: React.RefObject<HTMLDivElement>;
  private map: leaflet.Map;
  private layerGroup: leaflet.LayerGroup;
  private activeLayer: leaflet.Marker;

  private offersCoord: Array<coord>;
  private activeCoord: coord;
  private centerCoord: coord;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.map = null;

    this.layerGroup = null;
    this.activeLayer = null;

    this.offersCoord = null;
    this.activeCoord = null;
    this.centerCoord = null;
  }

  updateActiveLayer() {
    if (
      JSON.stringify(this.activeCoord) ===
      JSON.stringify(this.props.activeCoord)
    ) {
      return;
    }

    this.activeCoord = this.props.activeCoord;

    if (this.activeLayer !== null) {
      this.activeLayer.remove();
      this.activeLayer = null;
    }

    if (this.activeCoord !== null) {
      this.activeLayer = leaflet
        .marker(this.activeCoord, { icon: ICON_ACTIVE })
        .addTo(this.map);
    }
  }

  updateLayerGroup() {
    if (
      JSON.stringify(this.offersCoord) ===
      JSON.stringify(this.props.offersCoord)
    ) {
      return;
    }

    this.offersCoord = this.props.offersCoord;
    this.layerGroup.clearLayers();

    this.offersCoord.forEach(it => {
      leaflet.marker(it, { icon: ICON }).addTo(this.layerGroup);
    });
  }

  updateView() {
    if (
      JSON.stringify(this.centerCoord) ===
      JSON.stringify(this.props.centerCoord)
    ) {
      return;
    };

    this.centerCoord = this.props.centerCoord;
    this.map.setView(this.centerCoord, this.props.zoom);
  }

  componentDidUpdate() {
    this.updateActiveLayer();
    this.updateLayerGroup();
    this.updateView();
  }

  componentDidMount() {
    this.map = leaflet.map(this.mapRef.current.id, {
      zoomControl: false,
      scrollWheelZoom: false
    });

    leaflet.tileLayer(LAYER_URL).addTo(this.map);
    
    this.layerGroup = leaflet.layerGroup().addTo(this.map);

    this.updateActiveLayer();
    this.updateLayerGroup();
    this.updateView();
  }

  render() {
    return (
      <div
        ref={this.mapRef}
        id="map"
        style={{ width: `100%`, height: `100%` }}
      ></div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCoord: getActiveOfferCoord(state)
});

export {OffersMap};
export default connect(mapStateToProps)(OffersMap);
