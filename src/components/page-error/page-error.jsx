import React from 'react';
import PropTypes from 'prop-types';

const PageError = ({message, onClose}) => {

	return (
		<div className="page page--gray page--login" style={
      {
        position: `fixed`,
        top: 0,
        width: `100vw`,
        zIndex: 1000
      }}>
      <div className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">{message}</h1>
            <button className="form__submit button" type="button" onClick={onClose}>Продолжить</button>
          </section>
        </div>
      </div>
    </div>)
};

PageError.propTypes = {
	onClose: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired
}

export default PageError
