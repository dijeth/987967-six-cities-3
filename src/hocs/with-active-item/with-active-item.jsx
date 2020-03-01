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
        activeIndex: props.activeItem ? props.items.findIndex((it) => it === props.activeItem) : null
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
          it(this.props.items[activeIndex]);
        });
      }
    }

    render() {
      const { items } = this.props;
      const activeItem = this.state.activeIndex !== null ? items[this.state.activeIndex] : null;

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
