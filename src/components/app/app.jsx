import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import PageMain from '../page-main/page-main.jsx';
import PageFavotites from '../page-favorites/page-favorites.jsx';
import PageProperties from '../page-properties/page-properties.jsx';
import PageSignIn from '../page-sign-in/page-sign-in.jsx';
import history from '../../history.js';

import withPathName from '../../hocs/with-pathname/with-pathname.jsx';

const PagePropertiesWithPathName = withPathName(PageProperties);

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/offer/:id" render={({match}) => {
          const id = match.params.id;
          return <PagePropertiesWithPathName pathID={id} />;
        }} />
        <Route exact path="/login">
          <PageSignIn />
        </Route>
        <Route exact path="/favorites">
          <PageFavotites />
        </Route>
        <Route exact path="/">
          <PageMain />
        </Route>
      </Switch>
    </Router>);
};

App.propTypes = {};

export default App;
