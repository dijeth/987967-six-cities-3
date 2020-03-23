import * as React from 'react';

const withOpenState = (Component) => {
  type Props = React.ComponentProps<typeof Component>;
  type State = {
    isOpen: boolean
  };

  class WithOpenState extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };

      this._handleViewChange = this._handleViewChange.bind(this);
    }

    _handleViewChange() {
      this.setState((state) => ({
        isOpen: !state.isOpen
      }));
    }

    render() {
      return <Component isOpen={this.state.isOpen} onViewChange={this._handleViewChange} {...this.props} />;
    }
  }

  return WithOpenState;
};

export default withOpenState;
