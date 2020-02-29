import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../main/main.jsx';
import CardProperty from '../card-property/card-property.jsx';
import {getNeighbourhoods} from '../../mocks/offers.js';
import {connect} from 'react-redux';
import {ScreenType} from '../../const.js';
import {offerPropType} from '../place-card/place-card.jsx';

class App extends PureComponent {
  _renderApp() {
    const {offers, cities, activeCity, activeOffer, screenType} = this.props;

    return <Main
      cities={cities}
      activeCity={activeCity}
      offers={offers}
      activeOffer={activeOffer}
      isNearPlaces={screenType === ScreenType.PROPERTY}
    />;
  }

  render() {
    const {screenType, activeOffer, offers} = this.props;
    const isNearPlaces = screenType === ScreenType.PROPERTY;

    if (screenType === ScreenType.PROPERTY) {
      const neighbourhoods = getNeighbourhoods(activeOffer, offers);
      return <CardProperty
        offer={activeOffer}
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
              offer={this.props.offers[0]}
              neighbourhoods={getNeighbourhoods(offers[0], offers)}
              isNearPlaces={isNearPlaces}
            />
          </Route>
        </Switch>
      </BrowserRouter>);
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  screenType: PropTypes.oneOf([ScreenType.MAIN, ScreenType.PROPERTY]).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.number.isRequired,
  activeOffer: offerPropType
};

const mapStateToProps = (state) => ({
  offers: state.selectedOffers,
  screenType: state.screenType,
  cities: state.cities,
  activeCity: state.activeCity,
  activeOffer: state.activeOffer
});

export {App};
export default connect(mapStateToProps)(App);
