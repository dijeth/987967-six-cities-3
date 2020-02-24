import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../main/main.jsx';
import CardProperty from '../card-property/card-property.jsx';
import { getNeighbourhoods } from '../../mocks/offers.js';
import { connect } from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import { ScreenType } from '../../const.js';

class App extends PureComponent {
  _renderApp() {
    const { offerList, cities, activeCity, activeCard, screenType } = this.props;

    return <Main
        cities={cities}
        activeCity={activeCity}
        offerList={offerList}
        activeCard={activeCard}
        isNearPlaces={screenType === ScreenType.PROPERTY}
      />;
  }

  render() {
    const {screenType, activeCard, offerList} = this.props;
    const isNearPlaces = ScreenType === ScreenType.PROPERTY;

    if (screenType === ScreenType.PROPERTY) {
      const neighbourhoods = getNeighbourhoods(activeCard, offerList);
      return <CardProperty
        offer={activeCard}
        neighbourhoods={neighbourhoods}
        isNearPlaces={isNearPlaces}
      />;
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-card-property">
            <CardProperty
              offer={this.props.offerList[0]}
              neighbourhoods={getNeighbourhoods(offerList[0], offerList)}
              isNearPlaces={isNearPlaces}
            />
          </Route>
        </Switch>
      </BrowserRouter>);
  }
}

App.propTypes = {
  offerList: PropTypes.array.isRequired,
  screenType: PropTypes.oneOf([ScreenType.MAIN, ScreenType.PROPERTY]),
  cities: PropTypes.arrayOf(PropTypes.string),
  activeCity: PropTypes.number,
  activeCard: PropTypes.object
};

const mapStateToProps = (state) => ({
  offerList: state.selectedOffers,
  screenType: state.screenType,
  cities: state.cities,
  activeCity: state.activeCity,
  activeCard: state.activeCard
});

export { App };
export default connect(mapStateToProps)(App);
