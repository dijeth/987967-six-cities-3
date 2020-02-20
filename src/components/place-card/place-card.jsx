import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {OfferType, CardRenderType} from '../../const.js';
import {ratingToPercent} from '../../util.js';

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
  }

  _handleMouseLeave() {
    if (this.props.onCardHover) {
      this.props.onCardHover(null);
    }
  }

  _handleMouseEnter() {
    if (this.props.onCardHover) {
      this.props.onCardHover(this.props.offer);
    }
  }

  _handleTitleClick() {
    if (this.props.onCardClick) {
      this.props.onCardClick(this.props.offer);
    }
  }

  render() {
    const {offer, renderType} = this.props;
    const {id, title, type, pictures, cost, rating, isPremium, isFavorite} = offer;
    const ratingPercent = ratingToPercent(rating);
    const picture = pictures[0];

    return (
      <article
        className={`${renderType}__place-card place-card`}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        key={id}
      >
        {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
        <div className={`${renderType}__image-wrapper place-card__image-wrapper`}>
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
            <button className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${ratingPercent}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#" onClick={this._handleTitleClick}>{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>);
  }
}

const offerPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.PRIVATE_ROOM]),
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
  cost: PropTypes.number.isRequired,
  rating: PropTypes.number,
  isPremium: PropTypes.bool,
  isFavorite: PropTypes.bool,
  city: PropTypes.string.isRequired,
  coord: PropTypes.arrayOf(PropTypes.number)
});

PlaceCard.propTypes = {
  offer: offerPropType.isRequired,
  renderType: PropTypes.oneOf([CardRenderType.CITIES, CardRenderType.NEAR_PLACES]),
  onCardClick: PropTypes.func,
  onCardHover: PropTypes.func
};

PlaceCard.defaultProps = {
  renderType: CardRenderType.CITIES
};

export default PlaceCard;
export {offerPropType};
