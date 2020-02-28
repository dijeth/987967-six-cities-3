import React from 'react';
import PropTypes from 'prop-types';

const isChild = (element, parentElement) => {
  return element.parentElement === parentElement;
};

const getChild = (targetElement, parentElement) => {
  while (targetElement !== document.body && targetElement !== parentElement && !isChild(targetElement, parentElement)) {
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

const withActiveItem = (ListComponent) => {
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

      this.setState({activeIndex});

      const handlers = normalizeHandlerProp(this.props.onActiveItemChange);

      if (activeIndex !== null && handlers !== null) {
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
    onListClick: PropTypes.func.isRequired,
    onActiveItemChange: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.func)
    ])
  };

  return WithActiveItem;
};

export default withActiveItem;
