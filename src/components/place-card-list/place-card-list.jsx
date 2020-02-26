import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PlaceCard, { offerPropType } from '../place-card/place-card.jsx';
import ActionCreator from '../../action-creator.js';
import {connect} from 'react-redux';
import {ScreenType} from '../../const.js';

class PlaceCardList extends PureComponent {
  constructor(props) {
    super(props);

		this._handleClick = this._handleClick.bind(this);
		this._handleMouseEnter = this._handleMouseEnter.bind(this);
		this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  _getOfferIndex(element) {
  	return Number(element.dataset.index)
  }

  _handleClick(evt) {
  	const offer = this.props.offerList[this._getOfferIndex(evt.target)];
  	this.props.onOfferClick(offer);
  }

  _handleMouseEnter(evt) {
  	const offer = this.props.offerList[this._getOfferIndex(evt.target)];
  	this.props.onOfferHover(offer);
  }

  _handleMouseLeave() {
  	this.props.onOfferHover(null);
  }

  render() {
    const { offerList, isNearPlaces, onOfferHover, onOfferClick } = this.props;
    const classList = isNearPlaces ? `near-places__list places__list` : `cities__places-list places__list tabs__content`;
    const placeCardList = offerList.map((it, i) => (
    	<PlaceCard
	    	offer={it}
	    	isNearPlaces={isNearPlaces}
	    	key={it.id}
	    	offsetIndex={i}
    	/>));

    return (
      <div
      	className={classList}
      	onClick={onOfferClick ? this._handleClick : null}
				onMouseEnter={onOfferHover ? this._handleMouseEnter : null}
        onMouseLeave={onOfferHover ? this._handleMouseLeave : null}
      >
	      {placeCardList}
	    </div>);
  }
}

PlaceCardList.propTypes = {
  offerList: PropTypes.arrayOf(offerPropType).isRequired,
  isNearPlaces: PropTypes.bool.isRequired,
  onOfferHover: PropTypes.func,
  onOfferClick: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  onOfferClick(activeOffer) {
    dispatch(ActionCreator.changeActiveCard(activeOffer));
    dispatch(ActionCreator.changeScreenType(ScreenType.PROPERTY));
  },
  
  onOfferHover(activeOffer) {
    dispatch(ActionCreator.changeActiveCard(activeOffer));
  }
});

export default connect(null, mapDispacthToProps)(PlaceCardList);
