import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PageMain from '../page-main/page-main.jsx';
import PageProperties from '../page-properties/page-properties.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <PageMain />
        </Route>
        <Route exact path="/dev-page-properties">
          <PageProperties />
        </Route>
      </Switch>
    </BrowserRouter>);
};

App.propTypes = {};

export default App;
