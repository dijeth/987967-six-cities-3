import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../main/main.jsx';
import CardProperty from '../card-property/card-property.jsx';
import { getNeighbourhoods } from '../../mocks/offers.js';
import { connect } from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import { ScreenType } from '../../const.js';
import {offerPropType} from '../place-card/place-card.jsx';

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
  offerList: PropTypes.arrayOf(offerPropType).isRequired,
  screenType: PropTypes.oneOf([ScreenType.MAIN, ScreenType.PROPERTY]).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.number.isRequired,
  activeCard: offerPropType
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
