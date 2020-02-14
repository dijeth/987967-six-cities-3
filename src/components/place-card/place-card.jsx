import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OfferType } from '../../const.js';

const calcRating = (rating) => Math.round();

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { offer, handleCardClick } = this.props;
    const { id, title, type, picture, cost, rating, isPremium, isFavorite } = offer;

    const premium = !isPremium ? `` : (
      <div className="place-card__mark">
          <span>Premium</span>
        </div>);

    return (
      <article className="cities__place-card place-card" key={id}>
				{premium}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={picture} width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{cost}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={`place-card__bookmark-button ${isFavorite ? ` place-card__bookmark-button--active` : ``} button`} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${rating}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#" onClick={handleCardClick}>{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>)
  }
};

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.PRIVATE_ROOM]),
    picture: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    rating: PropTypes.oneOf([0, 20, 40, 60, 80, 100]),
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
    city: PropTypes.string.isRequired
  }).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

// PlaceCard.defaultProps = {
//   offer: {
//     type: OfferType.APARTMENT,
//     rating: 0,
//     isPremium: false,
//     isFavorite: false
//   }
// }

export default PlaceCard;
