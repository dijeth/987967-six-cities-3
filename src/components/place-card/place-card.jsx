import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OfferType, CardRenderType, ScreenType } from '../../const.js';
import { ratingToPercent } from '../../util.js';
import { ActionCreator } from '../../reducer.js';
import { connect } from 'react-redux';

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
  }

  _handleMouseLeave() {
    this.props.onCardHover(null);
  }

  _handleMouseEnter() {
    this.props.onCardHover(this.props.offer);
  }

  _handleTitleClick() {
    if (this.props.onCardClick) {
      this.props.onCardClick(this.props.offer);
    }
  }

  render() {
    const { offer, isNearPlaces } = this.props;
    const { id, title, type, pictures, cost, rating, isPremium, isFavorite } = offer;
    const ratingPercent = ratingToPercent(rating);
    const picture = pictures[0];
    const renderType = isNearPlaces ? `near-places` : `cities`;

    return (
      <article
        className={`${renderType}__place-card place-card`}
        onMouseEnter={isNearPlaces ? null : this._handleMouseEnter}
        onMouseLeave={isNearPlaces ? null : this._handleMouseLeave}
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
  onCardClick: PropTypes.func,
  onCardHover: PropTypes.func,
  isNearPlaces: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => ({
  onCardClick(activeOffer) {
    dispatch(ActionCreator.changeActiveCard(activeOffer));
    dispatch(ActionCreator.changeScreenType(ScreenType.PROPERTY))
  },
  onCardHover(activeOffer) {
    dispatch(ActionCreator.changeActiveCard(activeOffer))
  }
});

export default connect(null, mapDispatchToProps)(PlaceCard);
export { offerPropType };
