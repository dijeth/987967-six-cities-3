import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PageMain from '../page-main/page-main.jsx';
import PageProperties from '../page-properties/page-properties.jsx';
import PageSignIn from '../page-sign-in/page-sign-in.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/offer/:id" render={({match}) => <PageProperties activeOfferID={match.params.id} />} />
        <Route exact path="/login" render={() => <PageSignIn />} />
        <Route exact path="/">
          <PageMain />
        </Route>
      </Switch>
    </BrowserRouter>);
};

App.propTypes = {};

export default App;
