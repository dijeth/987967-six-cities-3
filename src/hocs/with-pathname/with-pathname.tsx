import * as React from 'react';
import {connect} from 'react-redux';
import ActionCreator from '../../reducers/app/action-creator.js';
import {Operation} from '../../reducers/data/operation.js';

type Props = {
  pathID: string;
  onActiveOfferChange: (pathID: string) => void;
}

const withPathName = (Component) => {
  const WithPathName: React.FC<Props> = (props) => {
    props.onActiveOfferChange(props.pathID);
    return <Component {...props} />;
  };

  const mapDispatchToProps = (dispatch) => ({
    onActiveOfferChange(id) {
      dispatch(ActionCreator.changeActiveOffer(id));
      dispatch(Operation.loadProperties(id));
    }
  });

  return connect(null, mapDispatchToProps)(WithPathName);
};

export default withPathName;
