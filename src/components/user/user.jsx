import React from 'react';
import PropTypes from 'prop-types';

const User = ({isAuthorized, userPicture, email, isUserSuper}) => {
	const userNameBlock = isAuthorized ? <span className="header__user-name user__name">{email}</span> : <span className="header__login">Sign in</span>

	return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile" href="#">
            <div className={`header__avatar-wrapper ${isUserSuper ? `header__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
              {userPicture && <img className="header__avatar user__avatar" src={userPicture} width="74" height="74" alt="User avatar" />}
            </div>
            {userNameBlock}
          </a>
        </li>
      </ul>
    </nav>)
};

User.propTypes = {
	isAuthorized: PropTypes.bool.isRequired,
	userPicture: PropTypes.string,
	email: PropTypes.string,
	isUserSuper: PropTypes.bool
}

export default React.memo(User);