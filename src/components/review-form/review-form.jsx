import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ReviewLength, EMPTY_REVIEW} from '../../const/const.js';
import {Operation} from '../../reducers/data/operation.js';
import UserActionCreator from '../../reducers/user/action-creator.js';
import {getUserReview} from '../../reducers/user/selectors.js';
import {getCommentSendingStatus, getCommentError} from '../../reducers/app/selectors.js';

class ReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.submit = React.createRef();
    this.form = React.createRef();

    this._handleSubmitStatus = this._handleSubmitStatus.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleReviewChange = this._handleReviewChange.bind(this);
  }

  componentDidMount() {
    this._updateForm()
  }

  componentDidUpdate() {
    if (this.props.isSending) {
      this._setFormDisableStatus(true);
      return;
    }

    this._updateForm();    
    this._setFormDisableStatus(false);
  }

  _updateForm() {
    const {savedReview, offerID} = this.props;
    const {text, rating} = savedReview.offerID === offerID ? savedReview : EMPTY_REVIEW;

    this._setReviewValue(text);
    this._setRatingValue(rating);
    this._handleSubmitStatus();
  }

  _setReviewValue(value) {
    this.form.current.querySelector(`.reviews__textarea`).value = value
  }

  _setRatingValue(value) {
    const stars = this.form.current.querySelectorAll(`.form__rating .form__rating-input`);
    const checkedElement = Array.from(stars).filter((it) => it.checked);

    if (checkedElement.length) {
      checkedElement[0].checked = false;
    };

    if (!value) {
      return
    };

    const element = this.form.current.querySelector(`[value="${value}"]`);

    if (element) {
      element.checked = true
    }
  }

  _handleReviewChange() {
    const formData = new FormData(this.form.current);
    const review = {
      text: formData.get(`review`) || ``,
      rating: formData.get(`rating`) || 0,
      offerID: this.props.offerID
    };

    this.props.onReviewChange(review)
  }

  _handleSubmitStatus() {
    const formData = new FormData(this.form.current);
    const submitElement = this.submit.current;

    if (formData.get(`rating`) === null) {
      submitElement.disabled = true;
      return;
    }

    const review = formData.get(`review`);
    if (review.length < ReviewLength.MIN || review.length > ReviewLength.MAX) {
      submitElement.disabled = true;
      return;
    }

    submitElement.disabled = false;
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(this.form.current);
    const rating = formData.get(`rating`);
    const comment = formData.get(`review`);
    const offerID = Number(this.props.offerID);

    this._setFormDisableStatus(true);

    this.props.onFormSubmit({comment, rating}, offerID);
  }

  _setFormDisableStatus(isDisable) {
    const elements = Array.from(this.form.current.elements);
    elements.forEach((it) => {
      it.disabled = isDisable;
    });

    if (!isDisable) {
      this._handleSubmitStatus();
    }
  }

  render() {
    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this._handleSubmit} ref={this.form}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating" onClick={this._handleSubmitStatus} onBlur={this._handleReviewChange}>
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
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          onChange={this._handleSubmitStatus}
          onBlur={this._handleReviewChange}
        ></textarea>

        <div className="reviews__button-wrapper">
          <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={true} ref={this.submit}>Submit</button>
        </div>
      </form>);
  }
}

ReviewForm.propTypes = {
  onFormSubmit: PropTypes.func,
  offerID: PropTypes.string,
  isSending: PropTypes.bool,
  onReviewChange: PropTypes.func,
  savedReview: PropTypes.object
};

const mapStateToProps = (state) => ({
  isSending: getCommentSendingStatus(state),
  savedReview: getUserReview(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(commentData, offerID) {
    dispatch(Operation.submitComment(commentData, offerID))
  },

  onReviewChange(review) {
    dispatch(UserActionCreator.userReviewText(review.text));
    dispatch(UserActionCreator.userReviewRating(review.rating));
    dispatch(UserActionCreator.userReviewOfferID(review.offerID));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
