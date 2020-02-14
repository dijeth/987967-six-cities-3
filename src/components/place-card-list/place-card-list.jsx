import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

class PlaceCardList extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const {offerList} = props;
		const placeCards = offerList.map((it) => {

			return (
				<PlaceCard offer={it} handleCardClick={handleCardClick} />)
		})

		return (
			<div className="cities__places-list places__list tabs__content">
				{placeCards}
			</div>)
	}
};

PlaceCardList.propTypes = {
	offerList: PropTypes.array.isRequired,
	handleCardClick: PropTypes.func.isRequired
};

export default PlaceCardList;