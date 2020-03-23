import * as React from 'react';
import {Route, Redirect} from 'react-router-dom';

type Props = {
  render: () => React.ReactNode;
  path: string;
  to: string;
  require: boolean;
}

const PrivateRoute: React.FC<Props> = ({render, path, require, to}) => {
  return <Route path={path} exact render={() => require ? render() : <Redirect to={to} /> } />;
};

export default PrivateRoute;
