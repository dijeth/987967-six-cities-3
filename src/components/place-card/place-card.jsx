import React from 'react';
import PropTypes from 'prop-types';
import {offerPropType} from '../../const/props.js';
import {AppRoute, PlaceCardType} from '../../const/const.js';
import {ratingToPercent} from '../../util.js';
import {Link} from 'react-router-dom';

const PlaceCardProperties = {
  [PlaceCardType.DEFAULT]: {
    articleClass: `cities__place-card`,
    imageWrapperClass: `cities__image-wrapper`,
    cardInfoClass: ``,
    imageWidth: 260,
    imageHeight: 200,
  },

  [PlaceCardType.FAVORITE]: {
    articleClass: `favorites__card`,
    imageWrapperClass: `favorites__image-wrapper`,
    cardInfoClass: `favorites__card-info`,
    imageWidth: 150,
    imageHeight: 110,
  },

  [PlaceCardType.NEARBY]: {
    articleClass: `near-places__card`,
    imageWrapperClass: `near-places__image-wrapper`,
    cardInfoClass: ``,
    imageWidth: 260,
    imageHeight: 200,
  }
}

const PlaceCard = ({offer, onHover, isAuth, type}) => {
  const {title, type: offerType, pictures, cost, rating, isPremium, isFavorite, id} = offer;
  const ratingPercent = ratingToPercent(rating);
  const picture = pictures[0];
  const link = AppRoute.getOffer(id);

  const handleMouseEnter = () => {
    onHover(offer);
  };

  const handleMouseLeave = () => {
    onHover(null);
  };

  const articleClass = PlaceCardProperties[type].articleClass;
  const imageWrapperClass = PlaceCardProperties[type].imageWrapperClass;
  const cardInfoClass = PlaceCardProperties[type].cardInfoClass;
  const imageWidth = PlaceCardProperties[type].imageWidth;
  const imageHeight = PlaceCardProperties[type].imageHeight;

  const favoriteButtonBlock = (
    <button className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`} type="button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{`${isFavorite ? `From` : `To`} bookmarks`}</span>
    </button>);

  const linkToLogin = (
    <Link to={AppRoute.getLogin()} className="place-card__bookmark-button button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </Link>);

  return (
    <article
      className={`${articleClass} place-card`}
      onMouseEnter={onHover ? handleMouseEnter : null}
      onMouseLeave={onHover ? handleMouseLeave : null}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={picture} width={imageWidth} height={imageHeight} alt="Place image"/>
        </a>
      </div>
      <div className={`${cardInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {isAuth ? favoriteButtonBlock : linkToLogin}
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
        <p className="place-card__type">{offerType}</p>
      </div>
    </article>);
};

PlaceCard.propTypes = {
  offer: offerPropType.isRequired,
  onHover: PropTypes.func,
  isAuth: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(Array.from(Object.values(PlaceCardType))).isRequired
};

export default React.memo(PlaceCard);
