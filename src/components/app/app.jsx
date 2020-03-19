import React from 'react';
import PropTypes from 'prop-types';
import {Router, Route, Switch} from 'react-router-dom';
import PageMain from '../page-main/page-main.jsx';
import PageFavotites from '../page-favorites/page-favorites.jsx';
import PageProperties from '../page-properties/page-properties.jsx';
import PageSignIn from '../page-sign-in/page-sign-in.jsx';
import history from '../../history.js';
import withPathName from '../../hocs/with-pathname/with-pathname.jsx';
import {getAuthorizationStatus} from '../../reducers/user/selectors.js';
import {connect} from 'react-redux';
import PrivateRoute from '../private-route/private-route.jsx';
import {AppRoute} from '../../const/const.js';

const PagePropertiesWithPathName = withPathName(PageProperties);

const App = ({isAuth}) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.getOffer(`:id`)} render={({match}) => {
          const id = match.params.id;
          return <PagePropertiesWithPathName pathID={id} />;
        }} />
        <PrivateRoute path={AppRoute.getLogin()} require={!isAuth} to={AppRoute.getRoot()} render={
          () => <PageSignIn />
        } />
        <PrivateRoute path={AppRoute.getFavorites()} require={isAuth} to={AppRoute.getLogin()} render={
          () => <PageFavotites />
        } />
        <Route exact path={AppRoute.getRoot()} component={PageMain} />
        <PageMain />
      </Switch>
    </Router>);
};

App.propTypes = {
  isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuth: getAuthorizationStatus(state)
});

export {App};
export default connect(mapStateToProps)(App);
