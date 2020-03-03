import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../main/main.jsx';
import CardProperty from '../card-property/card-property.jsx';
import {getNeighbourhoods} from '../../mocks/offers.js';
import {connect} from 'react-redux';
import {ScreenType} from '../../const.js';
import {offerPropType} from '../place-card/place-card.jsx';
import withSort from '../../hocs/with-sort/with-sort.jsx';

const MainWithSort = withSort(Main);

const App = ({screenType, activeOffer, offers}) => {
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
          <MainWithSort
            isNearPlaces={screenType === ScreenType.PROPERTY}
          />
        </Route>
        <Route exact path="/dev-card-property">
          <CardProperty
            offer={offers[0]}
            neighbourhoods={getNeighbourhoods(offers[0], offers)}
            isNearPlaces={isNearPlaces}
          />
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
  screenType: state.screenType,
  activeOffer: state.activeOffer,
  offers: state.offers
});

export {App};
export default connect(mapStateToProps)(App);
