import * as React from 'react';
import {ratingToPercent, getReviewDate, getDateTime} from '../../util.js';
import { UserReview } from '../../interfaces';

const Review: React.FC<UserReview> = ({userName, userPicture, rating, description, date: isoDate}) => {
  const date = new Date(Date.parse(isoDate));

  return (
    <React.Fragment>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={userPicture} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {userName}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${ratingToPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {description}
        </p>
        <time className="reviews__time" dateTime={getDateTime(date)}>{getReviewDate(date)}</time>
      </div>
    </React.Fragment>);
};

export default Review;
