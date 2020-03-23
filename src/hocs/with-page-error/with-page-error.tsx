import * as React from 'react';
import {connect} from 'react-redux';
import {getPageError} from '../../reducers/app/selectors.js';
import AppActionCreator from '../../reducers/app/action-creator.js';
import PageError from '../../components/page-error/page-error';

type Props = {
  pageError: string;
  onClearError: () => void;
};

const withPageError = (Component) => {
  const WithPageError: React.FC<Props> = (props) => {
    const {pageError, onClearError} = props;
    const isError = pageError !== ``;
    return (
      <React.Fragment>
        <Component {...props} />
        {isError && <PageError message={pageError} onClose={onClearError} />}
      </React.Fragment>);      
  };

  const mapStateToProps = (state) => ({
    pageError: getPageError(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    onClearError() {
      dispatch(AppActionCreator.setPageError(``));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithPageError);
};

export default withPageError;
