import React from 'react';
import PropTypes from 'prop-types';
import {compareObjects} from '../../util.js';

const NO_ACTIVE_INDEX = -1;

const getChildIndex = (targetElement, parentElement) => {
  const index = Array.from(parentElement.children).findIndex((it) => it.contains(targetElement));

  return index === -1 ? NO_ACTIVE_INDEX : index;
};

const withActiveItem = (ListComponent, clickTargetSelector) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeIndex: props.activeItem ? props.items.findIndex((it) => compareObjects(it, props.activeItem)) : NO_ACTIVE_INDEX
      };

      this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(evt) {
      const parentElement = evt.currentTarget;
      const element = evt.target;
      const activeIndex = getChildIndex(element, parentElement);

      if (activeIndex === NO_ACTIVE_INDEX) {
        return;
      }

      const activeItem = parentElement.children[activeIndex];


      if (clickTargetSelector && !activeItem.querySelector(clickTargetSelector).contains(element)) {
        return;
      }

      evt.preventDefault();

      this.setState({activeIndex});

      const handler = this.props.onActiveItemChange;

      if (handler !== null) {
        handler(this.props.items[activeIndex]);
      }
    }

    render() {
      const {items} = this.props;
      const activeItem = this.state.activeIndex !== NO_ACTIVE_INDEX ? items[this.state.activeIndex] : null;

      return <ListComponent {...this.props} activeItem={activeItem} onListClick={this._handleClick} />;
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.any,
    items: PropTypes.array,
    onActiveItemChange: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.func)
    ])
  };

  return WithActiveItem;
};

export default withActiveItem;
