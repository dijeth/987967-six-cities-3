import React from 'react';

const withOpenState = (Component) => {
  class WithOpenState extends React.PureComponent {
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

  WithOpenState.propTypes = {};

  return WithOpenState;
};

export default withOpenState;
