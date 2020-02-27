import React from 'react';

const WithActiveItem = (ListComponent) => {
	return class extends React.PureComponent {

		render() {
			return <ListComponent activeItem={111} {...this.props}/>
		}
	}
};

export default WithActiveItem;