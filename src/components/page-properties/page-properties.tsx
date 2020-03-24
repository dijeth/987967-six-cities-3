import * as React from 'react';
import {BREAK_STRING, MAX_IMAGE_COUNT} from '../../const/const';
import {ratingToPercent} from '../../util.js';
import ReviewList from '../review-list/review-list';
import ReviewForm from '../review-form/review-form';
import OffersNearby from '../offers-nearby/offers-nearby';
import OffersMap from '../offers-map/offers-map';
import {AppRoute} from '../../const/const';
import Header from '../header/header';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
import {getComments, getNearbyCoordList} from '../../reducers/data/selectors.js';
import {Operation as DataOperation} from '../../reducers/data/operation.js';
import {getActiveOffer, getActiveOfferCoord} from '../../reducers/app/selectors.js';
import withLoading from '../../hocs/with-loading/with-loading';
import withPageError from '../../hocs/with-page-error/with-page-error';
import {Link, Redirect} from 'react-router-dom';
import Adapter from '../../adapter/adapter.js';
import {Offer, UserReview, OfferMini} from '../../interfaces';
import {coord} from '../../types';

type Props = {
  offer: Offer;
  reviews: Array<UserReview>;
  isAuthorized: boolean;
  activeCityCoord: coord;
  onFavoriteChange: (offer: OfferMini) => void;
  offersCoord: Array<coord>;
};

const PageProperties: React.FC<Props> = ({offer, reviews, isAuthorized, activeCityCoord, offersCoord, onFavoriteChange}) => {
  if (offer === null) {
    return <Redirect to={AppRoute.getRoot()} />;
  }

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
    isSuperUser,
    description,
    descriptionTitle,
    id,
    zoom
  } = offer;

  const gallery = pictures.slice(1, 1 + MAX_IMAGE_COUNT).map((it, i) => {
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

  const centerCoord = activeCityCoord;

  const favoriteButtonBlock = (
    <button
      className={`property__bookmark-button ${isFavorite ? `property__bookmark-button--active` : ``} button`}
      type="button"
      onClick={() => {
        onFavoriteChange(offer);
      }}
    >
      <svg className="property__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>);

  const linkToLoginBlock = (
    <Link to={AppRoute.getLogin()} className={`property__bookmark-button button`} type="button">
      <svg className="property__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </Link>);

  return (
    <div className="page">
      <Header isActiveLogo={false} />
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
                {isAuthorized ? favoriteButtonBlock : linkToLoginBlock}
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
                  <div className={`property__avatar-wrapper ${isSuperUser ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={`/${userPicture}`} width="74" height="74" alt="Host avatar" />
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
                {reviews && <ReviewList reviews={reviews} />}
                {isAuthorized && <ReviewForm offerID={id} />}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <OffersMap centerCoord={centerCoord} offersCoord={offersCoord} zoom={zoom} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersNearby nearPlacesFor={id} isAuth={isAuthorized} />
            </div>
          </section>
        </div>
      </main>
    </div>);
};

const mapStateToProps = (state) => ({
  offer: getActiveOffer(state),
  isAuthorized: getAuthorizationStatus(state),
  activeCityCoord: getActiveOfferCoord(state),
  reviews: getComments(state),
  offersCoord: getNearbyCoordList(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFavoriteChange(offer) {
      dispatch(DataOperation.changeFavorite(offer.id, Adapter.postFavorite(!offer.isFavorite)));
    }
  };
};

export {PageProperties};
export default withPageError(withLoading(connect(mapStateToProps, mapDispatchToProps)(PageProperties)));
