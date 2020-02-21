import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../main/main.jsx';
import CardProperty from '../card-property/card-property.jsx';
import { getNeighbourhoods } from '../../mocks/offers.js';
import { connect } from 'react-redux';
import {ActionCreator} from '../../reducer.js';

class App extends PureComponent {
  _renderApp() {
    const { offerList, cities, activeCity } = this.props;

    return <Main cities={cities} activeCity={activeCity} offerList={offerList} />;
  }

  render() {
    if (this.props.cardProperty) {
      const neighbourhoods = getNeighbourhoods(this.props.cardProperty.id);
      return <CardProperty offer={this.props.cardProperty} neighbourhoods={neighbourhoods} />;
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-card-property">
            <CardProperty offer={this.props.offerList[0]} neighbourhoods={getNeighbourhoods(`0`)} />
          </Route>
        </Switch>
      </BrowserRouter>);
  }
}

App.propTypes = {
  offerList: PropTypes.array.isRequired,
  cardProperty: PropTypes.object,
  cities: PropTypes.arrayOf(PropTypes.string),
  activeCity: PropTypes.number
};

const mapStateToProps = (state) => ({
  offerList: state.selectedOffers,
  cardProperty: state.activeCard,
  cities: state.cities,
  activeCity: state.activeCity
});

export { App };
export default connect(mapStateToProps)(App);
