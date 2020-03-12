import React from 'react';
import PropTypes from 'prop-types';
import {offerPropType} from '../../const/props.js';
import {AppRoute} from '../../const/const.js';
import {ratingToPercent} from '../../util.js';
import {Link} from 'react-router-dom';

const PlaceCard = ({offer, isNearPlaces, onHover}) => {
  const {title, type, pictures, cost, rating, isPremium, isFavorite, id} = offer;
  const ratingPercent = ratingToPercent(rating);
  const picture = pictures[0];
  const renderType = isNearPlaces ? `near-places` : `cities`;
  const link = AppRoute.getOffer(id);
  const handleMouseEnter = () => {
    onHover(offer);
  };

  const handleMouseLeave = () => {
    onHover(null);
  };

  return (
    <article
      className={`${renderType}__place-card place-card`}
      onMouseEnter={onHover ? handleMouseEnter : null}
      onMouseLeave={onHover ? handleMouseLeave : null}
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
          <Link to={link}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>);
};

PlaceCard.propTypes = {
  offer: offerPropType.isRequired,
  onHover: PropTypes.func,
  isNearPlaces: PropTypes.bool.isRequired
};

export default PlaceCard;
