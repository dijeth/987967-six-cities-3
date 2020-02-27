import React from 'react';

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

	return Array.from(parentElement.children).inedxOf(child);
}

const withActiveItem = (ListComponent, clickHandlerName) => {
	return class extends React.PureComponent {
		constructor(props) {
			super(props);

			this.state = {
				activeIndex: null
			};

			this._handleClick = this._handleClick.bind(this);
		}

		_handleClick(evt) {
			console.log(123)
			const parentElement = evt.currentTarget;
			const element = evt.target;

			this.setState({
				activeIndex: getChildIndex(element, parentElement)
			});
		}

		render() {
			const {[clickHandlerName]: clickHandler, ...props} = this.props;

			return <ListComponent activeItem={this.state.activeIndex} clickHandlerName={this._handleClick}/>
		}
	}
};

export default withActiveItem;