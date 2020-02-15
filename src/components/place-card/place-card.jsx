import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {OfferType} from '../../const.js';

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  render() {
    const {offer, handleCardClick} = this.props;
    const {id, title, type, pictures, cost, rating: ratingMock, isPremium, isFavorite} = offer;
    const rating = Math.floor(ratingMock) * 20;
    const picture = pictures[0];

    const premium = !isPremium ? `` : (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>);

    return (
      <article
        className="cities__place-card place-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        key={id}
      >
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
      </article>);
  }

  _handleMouseLeave() {
    this.props.handleCardHover(null);
  }

  _handleMouseEnter() {
    this.props.handleCardHover(this.props.offer);
  }
}

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.PRIVATE_ROOM]),
    pictures: PropTypes.arrayOf(PropTypes.string),
    cost: PropTypes.number.isRequired,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
    city: PropTypes.string.isRequired
  }).isRequired,
  handleCardClick: PropTypes.func,
  handleCardHover: PropTypes.func
};

export default PlaceCard;
