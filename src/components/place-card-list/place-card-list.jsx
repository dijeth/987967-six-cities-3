import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard, {offerPropType} from '../place-card/place-card.jsx';
import {CardRenderType} from '../../const.js';

class PlaceCardList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeOffer: null
    };

    this.handleCardHover = this.handleCardHover.bind(this);
  }

  handleCardHover(activeOffer) {
    this.setState({activeOffer});
  }

  render() {
    const {offerList, onCardClick, renderType} = this.props;

    const classList = renderType === CardRenderType.CITIES ? `cities__places-list places__list tabs__content` : `near-places__list places__list`;

    return (
      <div className={classList}>
        {offerList.map((it) => <PlaceCard offer={it} onCardClick={onCardClick} onCardHover={this.handleCardHover} key={it.id} />)}
      </div>);
  }
}

PlaceCardList.propTypes = {
  offerList: PropTypes.arrayOf(offerPropType).isRequired,
  renderType: PropTypes.oneOf([CardRenderType.CITIES, CardRenderType.NEAR_PLACES]),
  onCardClick: PropTypes.func
};

PlaceCardList.defaultProps = {
  renderType: CardRenderType.CITIES
};

export default PlaceCardList;
