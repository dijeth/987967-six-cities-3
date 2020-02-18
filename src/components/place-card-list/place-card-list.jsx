import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard, {offerPropType} from '../place-card/place-card.jsx';

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
    const {offerList, onCardClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offerList.map((it) => <PlaceCard offer={it} onCardClick={onCardClick} onCardHover={this.handleCardHover} key={it.id} />)}
      </div>);
  }
}

PlaceCardList.propTypes = {
  offerList: PropTypes.arrayOf(offerPropType).isRequired,
  onCardClick: PropTypes.func
};

export default PlaceCardList;
