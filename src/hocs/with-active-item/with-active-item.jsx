import React from 'react';
import PropTypes from 'prop-types';

const getChildIndex = (targetElement, parentElement) => {
  const index = Array.from(parentElement.children).findIndex((it) => it.contains(targetElement));

  return index === -1 ? null : index;
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
        return;
      }

      if (clickTargetSelector && !parentElement.children[activeIndex].querySelector(clickTargetSelector).contains(element)) {
        return;
      }

      this.setState({activeIndex});

      const handlers = normalizeHandlerProp(this.props.onActiveItemChange);

      if (handlers !== null) {
        handlers.forEach((it) => {
          it(this.props.items[activeIndex]);
        });
      }
    }

    render() {
      const {items} = this.props;
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
