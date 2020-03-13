import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReviewLength } from '../../const/const.js';
import { Operation } from '../../reducers/user/operation.js';
import { getCommentSendingStatus, getCommentError } from '../../reducers/app/selectors.js';

class ReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.submit = React.createRef();
    this.form = React.createRef();

    this._handleFormChange = this._handleFormChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleFormChange() {
    const formData = new FormData(this.form.current);
    const submitElement = this.submit.current;

    if (formData.get(`rating`) === null) {
      submitElement.disabled = true;
      return
    };

    const review = formData.get(`review`);
    if (review.length < ReviewLength.MIN || review.length > ReviewLength.MAX) {
      submitElement.disabled = true;
      return
    };

    submitElement.disabled = false;
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(this.form.current);
    const rating = formData.get(`rating`);
    const comment = formData.get(`review`);
    const offerID = Number(this.props.offerID);

    this.props.onSubmit({ comment, rating } , offerID );
  }

  _setDisableStatus(isDisable) {
    const elements = Array.from(this.form.current.elements);
    elements.forEach((it) => { it.disabled = isDisable });

    if (!isDisable) {
      this._handleFormChange()
    }
  }

  componentDidUpdate() {
    if (this.props.isSending) {
      this._setDisableStatus(true);
      return
    };

    if (!this.props.sendingError) {
      this.form.current.reset();
      return
    };

    this._setDisableStatus(false);
  }

  render() {
    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this._handleSubmit} ref={this.form}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" onClick={this._handleFormChange}>
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
      	onChange={this._handleFormChange}
      ></textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={true} ref={this.submit}>Submit</button>
      </div>
    </form>)
  }
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func,
  offerID: PropTypes.string,
  isSending: PropTypes.bool,
  sendingError: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isSending: getCommentSendingStatus(state),
  sendingError: getCommentError(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit(commentData, offerID) {
    dispatch(Operation.submitComment(commentData, offerID))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
