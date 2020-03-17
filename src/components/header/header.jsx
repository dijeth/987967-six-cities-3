import React from 'react';
import PropTypes from 'prop-types';
import {AppRoute} from '../../const/const.js';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserPicture, getEmail, getIsUserSuper, getAuthorizationStatus} from '../../reducers/user/selectors.js';

const Header = ({isAuthorized, userPicture, email, isSuperUser, isActiveLogo}) => {
  const userNameBlock = isAuthorized ?
    <span className="header__user-name user__name">{email}</span> :
    <span className="header__login">Sign in</span>;

  const link = isAuthorized ? AppRoute.getFavorites() : AppRoute.getLogin();

  const inactiveLogoBLock = (
    <a className="header__logo-link header__logo-link--active">
      <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </a>);

  const activeLogoBlock = (
    <Link to={AppRoute.getRoot()} className="header__logo-link">
      <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {isActiveLogo ? inactiveLogoBLock : activeLogoBlock}
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={link} className="header__nav-link header__nav-link--profile" href="#">
                  <div className={`header__avatar-wrapper ${isSuperUser ? `header__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    {isAuthorized && userPicture && <img className="header__avatar user__avatar" src={`https://htmlacademy-react-3.appspot.com/six-cities${userPicture}`} width="74" height="74" alt="User avatar" />}
                  </div>
                  {userNameBlock}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>);
};

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  userPicture: PropTypes.string,
  email: PropTypes.string,
  isSuperUser: PropTypes.bool,
  isActiveLogo: PropTypes.bool
};

const mapStateToProps = (state) => ({
  userPicture: getUserPicture(state),
  email: getEmail(state),
  isSuperUser: getIsUserSuper(state),
  isAuthorized: getAuthorizationStatus(state)
});

export {Header};
export default connect(mapStateToProps)(Header);
