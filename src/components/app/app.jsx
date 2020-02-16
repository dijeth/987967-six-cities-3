import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../main/main.jsx';
import CardProperty from '../card-property/card-property.jsx';

const handleCardClick = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardProperty: null
    };

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  render() {
    if (this.state.cardProperty) {
      return <CardProperty offer={this.state.cardProperty} />
    };

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-card-property">
            <CardProperty offer={this.props.offerList[0]} />
          </Route>
        </Switch>
      </BrowserRouter>);
  }

  _renderApp() {
    const { placesCount, offerList } = this.props;

    return <Main placesCount={placesCount} offerList={offerList} onCardClick={this.handleCardClick} />;
  }

  handleCardClick(offer) {
    this.setState({
      cardProperty: offer
    })
  }
}

App.propTypes = {
  placesCount: PropTypes.number.isRequired,
  offerList: PropTypes.array.isRequired
};

export default App;
