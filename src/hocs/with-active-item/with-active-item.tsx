import * as React from 'react';
import { compareObjects } from '../../util.js';

const NO_ACTIVE_INDEX = -1;

const getChildIndex = (targetElement, parentElement) => {
  const childrenElements: HTMLCollection = parentElement.children;
  const index = Array.from(childrenElements).findIndex((it) => it.contains(targetElement));

  return index === -1 ? NO_ACTIVE_INDEX : index;
};

type Props<T> = {
  items: Array<T>;
  activeItem?: T | null;
  onActiveItemChange: (activeItem: any | null) => void;
};

const withActiveItem = <T extends unknown>(
  ListComponent,
  clickTargetSelector?) => {

  type State = {
    activeIndex: number;
  }

  class WithActiveItem extends React.PureComponent<Props<T>, State> {
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

      this.setState({ activeIndex });

      const handler = this.props.onActiveItemChange;

      if (handler !== null) {
        handler(this.props.items[activeIndex]);
      }
    }

    render() {
      const { items } = this.props;
      const activeItem = this.state.activeIndex !== NO_ACTIVE_INDEX ? items[this.state.activeIndex] : null;

      return <ListComponent {...this.props} activeItem={activeItem} onListClick={this._handleClick} />;
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
