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
  }

  _getOfferIndex(element, currentElement) {
  	while (element !== currentElement && element.dataset.index === undefined) {
  		element = element.parentElement
  	};

  	if (element === currentElement) {
  		return null
  	};

  	if (element.dataset.index === undefined) {
  		return null
  	};

  	return Number(element.dataset.index)
  }

  _handleClick(evt) {
  	const offsetIndex = this._getOfferIndex(evt.target, evt.currentTarget);

  	if (offsetIndex === null) {
  		return;
  	};

  	const offer = this.props.offerList[offsetIndex];

  	this.props.onOfferClick(offer);
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
	    	onHover={isNearPlaces ? null : onOfferHover}
    	/>));

    return (
      <div
      	className={classList}
      	onClick={this._handleClick}
      >
	      {placeCardList}
	    </div>);
  }
}

PlaceCardList.propTypes = {
  offerList: PropTypes.arrayOf(offerPropType).isRequired,
  isNearPlaces: PropTypes.bool.isRequired,
  onOfferHover: PropTypes.func.isRequired,
  onOfferClick: PropTypes.func.isRequired
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

export {PlaceCardList};
export default connect(null, mapDispatchToProps)(PlaceCardList);
