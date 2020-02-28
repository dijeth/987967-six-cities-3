import React from 'react';
import PropTypes from 'prop-types';

const isChild = (element, parentElement) => {
	 return element.parentElement === parentElement;
}

const getChild = (targetElement, parentElement) => {
	while (targetElement !== document.body && targetElement !== parentElement && !isChild(targetElement, parentElement)) {
		targetElement = targetElement.parentElement
	};

	if (targetElement === parentElement || targetElement === document.body) {
		return null
	};

	return targetElement;
}

const getChildIndex = (targetElement, parentElement) => {
	const child = getChild(targetElement, parentElement);

	if (child === null) {
		return null
	};

	return Array.from(parentElement.children).indexOf(child);
}

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

			if (activeIndex !== null && this.props.onActiveItemChange) {
				this.props.onActiveItemChange(activeIndex)
			};
		}

		render() {
			const {onListClick, activeItem, ...props} = this.props;

			return <ListComponent activeItem={this.state.activeIndex} onListClick={this._handleClick} {...props} />
		}
	};

	return WithActiveItem;

	WithActiveItem.propTypes = {};
};

export default withActiveItem;