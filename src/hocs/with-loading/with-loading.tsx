import * as React from 'react';
import {connect} from 'react-redux';
import {getLoading} from '../../reducers/app/selectors.js';

type Props = {
  loading: number;
};

const withLoading = (Component) => {
  const WithLoading: React.FC<Props> = (props) => {
    if (props.loading !== 0) {
      return <h1>Loading...</h1>;
    }

    return <Component {...props} />;
  };
  
  const mapStateToProps = (state) => ({
    loading: getLoading(state)
  });

  return connect(mapStateToProps)(WithLoading);
};

export default withLoading;
