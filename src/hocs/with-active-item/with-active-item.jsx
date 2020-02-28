import React from 'react';
import PropTypes from 'prop-types';

const isChildOf = (element, parentElement) => {
  return element.parentElement === parentElement;
};

const isChild = (element, parentElement) => {
  if (element === parentElement) {
    return true
  };

  while (element !== document.body && element !== parentElement) {
    element = element.parentElement
  };

  return element !== document.body
}

const getChild = (targetElement, parentElement) => {
  while (targetElement !== document.body && targetElement !== parentElement && !isChildOf(targetElement, parentElement)) {
    targetElement = targetElement.parentElement;
  }

  if (targetElement === parentElement || targetElement === document.body) {
    return null;
  }

  return targetElement;
};

const getChildIndex = (targetElement, parentElement) => {
  const child = getChild(targetElement, parentElement);

  if (child === null) {
    return null;
  }

  return Array.from(parentElement.children).indexOf(child);
};

const normalizeHandlerProp = (handlerProp) => {
  if (handlerProp === undefined || handlerProp === null) {
    return null;
  }

  if (handlerProp.constructor.name) {
    return [handlerProp];
  }

  return handlerProp;
};

const withActiveItem = (ListComponent, clickTargetSelector) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeIndex: props.activeItem
      };

      this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(evt) {
      const parentElement = evt.currentTarget;
      const element = evt.target;
      const activeIndex = getChildIndex(element, parentElement);

      if (activeIndex === null) {
        return
      };

      if (clickTargetSelector && !isChild(element, parentElement.children[activeIndex].querySelector(clickTargetSelector))) {
        return
      }

      this.setState({ activeIndex });

      const handlers = normalizeHandlerProp(this.props.onActiveItemChange);

      if (handlers !== null) {
        handlers.forEach((it) => {
          it(activeIndex);
        });
      }
    }

    render() {
      // const { onListClick, activeItem, ...props } = this.props;
      return <ListComponent {...this.props} activeItem={this.state.activeIndex} onListClick={this._handleClick} />;
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.number,
    onListClick: PropTypes.func,
    onActiveItemChange: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.func)
    ])
  };

  return WithActiveItem;
};

export default withActiveItem;
