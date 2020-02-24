import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PlaceCard, { offerPropType } from '../place-card/place-card.jsx';

class PlaceCardList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeOffer: null
    };

    this.handleCardHover = this.handleCardHover.bind(this);
  }

  handleCardHover(activeOffer) {
    this.setState({ activeOffer });
  }

  render() {
    const { offerList, onCardClick, onCardHover, isNearPlaces} = this.props;

    const classList = isNearPlaces ? `near-places__list places__list` : `cities__places-list places__list tabs__content`;

    return (
      <div className={classList}>
        {offerList.map((it) => <PlaceCard offer={it} isNearPlaces={isNearPlaces} key={it.id} />)}
      </div>);
  }
}

PlaceCardList.propTypes = {
  offerList: PropTypes.arrayOf(offerPropType).isRequired,
  isNearPlaces: PropTypes.bool.isRequired
};

export default PlaceCardList;
