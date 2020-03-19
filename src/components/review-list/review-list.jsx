import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review.jsx';
import {reviewPropTypes} from '../../const/props.js';

const ReviewList = ({reviews}) => {
  const sortedList = reviews.slice(0, 9).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const reviewList = sortedList.map((it) => {
    const {id} = it;
    return (
      <li className="reviews__item" key={id}>
        <Review
          id={it.id}
          userName={it.userName}
          userPicture={it.userPicture}
          rating={it.rating}
          description={it.description}
          date={it.date}
        />
      </li>);
  });

  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviewList}
      </ul>
    </React.Fragment>);
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewPropTypes))
};

export default React.memo(ReviewList);
