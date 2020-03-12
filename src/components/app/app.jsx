import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PageMain from '../page-main/page-main.jsx';
import PageProperties from '../page-properties/page-properties.jsx';
import PageSignIn from '../page-sign-in/page-sign-in.jsx';

import withPathName from '../../hocs/with-pathname/with-pathname.jsx';

const PagePropertiesWithPathName = withPathName(PageProperties);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/offer/:id" render={({match}) => {
          const id = match.params.id;
          return <PagePropertiesWithPathName pathID={id} />;
        }} />
        <Route exact path="/login" render={() => <PageSignIn />} />
        <Route exact path="/">
          <PageMain />
        </Route>
      </Switch>
    </BrowserRouter>);
};

App.propTypes = {};

export default App;
