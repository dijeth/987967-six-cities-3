import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

class PlaceCardList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeOffer: null
    };

    this.handleCardHover = this.handleCardHover.bind(this);
  }

  render() {
    const {offerList, onCardClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offerList.map((it) => <PlaceCard offer={it} onCardClick={onCardClick} onCardHover={this.handleCardHover} key={it.id} />)}
      </div>);
  }

  handleCardHover(activeOffer) {
    this.setState({activeOffer});
  }
}

PlaceCardList.propTypes = {
  offerList: PropTypes.array.isRequired,
  onCardClick: PropTypes.func
};

export default PlaceCardList;
