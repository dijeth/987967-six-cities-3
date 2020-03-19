import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({render, path, require, to}) => {
  return <Route path={path} exact render={() => require ? render() : <Redirect to={to} /> } />;
};

PrivateRoute.propTypes = {
  render: PropTypes.func,
  path: PropTypes.string,
  require: PropTypes.bool,
  to: PropTypes.string
};

export default PrivateRoute;
