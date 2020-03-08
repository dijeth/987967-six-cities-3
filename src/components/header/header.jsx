import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ isAuthorized, userPicture, email, isUserSuper, isActiveLogo }) => {
  const userNameBlock = isAuthorized ? <span className="header__user-name user__name">{email}</span> : <span className="header__login">Sign in</span>

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className={`header__logo-link ${isActiveLogo ? `header__logo-link--active` : ``}`}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
			      <ul className="header__nav-list">
			        <li className="header__nav-item user">
			          <a className="header__nav-link header__nav-link--profile" href="#">
			            <div className={`header__avatar-wrapper ${isUserSuper ? `header__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
			              {userPicture !== `` && <img className="header__avatar user__avatar" src={userPicture} width="74" height="74" alt="User avatar" />}
			            </div>
			            {userNameBlock}
			          </a>
			        </li>
			      </ul>
			    </nav>
        </div>
      </div>
    </header>)
};

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  userPicture: PropTypes.string,
  email: PropTypes.string,
  isUserSuper: PropTypes.bool,
  isActiveLogo: PropTypes.bool
};

Header.defaultProps = {
  userPicture: ``,
  isUserSuper: false,
  isActiveLogo: false
};

export default Header;
