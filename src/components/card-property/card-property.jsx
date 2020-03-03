import React from 'react';
import PropTypes from 'prop-types';
import {OfferType, BREAK_STRING} from '../../const.js';
import {ratingToPercent} from '../../util.js';
import ReviewList, {reviewListPropTypes} from '../review-list/review-list.jsx';
import {offerPropType} from '../place-card/place-card.jsx';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import OffersMap from '../offers-map/offers-map.jsx';
import {CityCoord} from '../../const.js';

const CardProperty = ({offer, neighbourhoods, isNearPlaces}) => {
  const {
    title,
    type,
    pictures,
    cost,
    rating,
    isPremium,
    isFavorite,
    bedroomCount,
    adultsCount,
    insideFeatures,
    userName,
    userPicture,
    isUserSuper,
    description,
    descriptionTitle,
    reviews,
    city
  } = offer;

  const gallery = pictures.map((it, i) => {
    return (
      <div className="property__image-wrapper" key={`${it}-${i}`}>
        <img className="property__image" src={it} alt="Photo studio" />
      </div>);
  });

  const ratingPercent = ratingToPercent(rating);

  const features = insideFeatures.map((it, i) => {
    return (
      <li className="property__inside-item" key={`${it}-${i}`}>
        {it}
      </li>);
  });

  const descriptionText = description.split(BREAK_STRING).map((it, i) => {
    return <p className="property__text" key={`${it}-${i}`}>{it}</p>;
  });

  const centerCoord = CityCoord[city];
  const offersCoord = neighbourhoods.map((it) => it.coord);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {gallery}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button ${isFavorite ? `property__bookmark-button--active` : ``} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${ratingPercent}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedroomCount} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {adultsCount} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{cost}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {features}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">{descriptionTitle}</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${isUserSuper ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={userPicture} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {userName}
                  </span>
                </div>
                <div className="property__description">
                  {descriptionText}
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewList reviews={reviews} />
                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>
                  <div className="reviews__rating-form form__rating">
                    <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                    <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                    <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                    <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                    <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                    <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>
                  </div>
                  <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <section className="property__map map">
            <OffersMap centerCoord={centerCoord} offersCoord={offersCoord} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlaceCardList items={neighbourhoods} isNearPlaces={isNearPlaces} />
            </div>
          </section>
        </div>
      </main>
    </div>);
};


CardProperty.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.PRIVATE_ROOM]),
    pictures: PropTypes.arrayOf(PropTypes.string),
    cost: PropTypes.number.isRequired,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
    city: PropTypes.string.isRequired,
    bedroomCount: PropTypes.number,
    adultsCount: PropTypes.number,
    insideFeatures: PropTypes.arrayOf(PropTypes.string),
    userName: PropTypes.string.isRequired,
    userPicture: PropTypes.string,
    isUserSuper: PropTypes.bool,
    descriptionTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reviews: reviewListPropTypes,
    coord: PropTypes.arrayOf(PropTypes.number)
  }).isRequired,
  neighbourhoods: PropTypes.arrayOf(offerPropType),
  isNearPlaces: PropTypes.bool.isRequired
};


export default CardProperty;
