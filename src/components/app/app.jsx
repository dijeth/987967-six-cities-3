import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../main/main.jsx';
import CardProperty from '../card-property/card-property.jsx';
import { getNeighbourhoods } from '../../mocks/offers.js';
import { connect } from 'react-redux';
import { ScreenType } from '../../const/const.js';
import { offerPropType } from '../../const/props.js';
import {getScreenType, getActiveOffer} from '../../reducers/app/selectors.js';
import {getOffers} from '../../reducers/data/selectors.js';

const App = ({ screenType, activeOffer, offers }) => {
  const isNearPlaces = screenType === ScreenType.PROPERTY;

  if (screenType === ScreenType.PROPERTY) {
    const neighbourhoods = getNeighbourhoods(activeOffer, offers);
    return (
      <CardProperty
          offer={activeOffer}
          neighbourhoods={neighbourhoods}
          isNearPlaces={isNearPlaces}
        />);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main isNearPlaces={screenType === ScreenType.PROPERTY} />
        </Route>
        <Route exact path="/dev-card-property">
          
        </Route>
      </Switch>
    </BrowserRouter>);
};

App.propTypes = {
  screenType: PropTypes.oneOf([ScreenType.MAIN, ScreenType.PROPERTY]).isRequired,
  activeOffer: offerPropType,
  offers: PropTypes.arrayOf(offerPropType)
};

const mapStateToProps = (state) => ({
  screenType: getScreenType(state),
  activeOffer: getActiveOffer(state),
  offers: getOffers(state)
});

export { App };
export default connect(mapStateToProps)(App);
