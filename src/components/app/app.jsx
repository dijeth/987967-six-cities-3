import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../main/main.jsx';
import CardProperty from '../card-property/card-property.jsx';
import { getNeighbourhoods } from '../../mocks/offers.js';
import { connect } from 'react-redux';
import { ScreenType, SORT_LIST } from '../../const.js';
import { sortOffers } from '../../util.js';
import { offerPropType } from '../place-card/place-card.jsx';

const App = ({ screenType, activeOffer, offers, cities, activeCity, sortType }) => {
  const isNearPlaces = screenType === ScreenType.PROPERTY;

  if (screenType === ScreenType.PROPERTY) {
    const neighbourhoods = getNeighbourhoods(activeOffer, offers);
    return <CardProperty
        offer={activeOffer}
        neighbourhoods={neighbourhoods}
        isNearPlaces={isNearPlaces}
      />;
  };

  const sortedOffer = sortOffers(offers, SORT_LIST[sortType]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            cities={cities}
            activeCity={activeCity}
            offers={sortedOffer}
            activeOffer={activeOffer}
            isNearPlaces={screenType === ScreenType.PROPERTY}
            sortType={sortType}
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
}

App.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  screenType: PropTypes.oneOf([ScreenType.MAIN, ScreenType.PROPERTY]).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.number.isRequired,
  activeOffer: offerPropType,
  sortType: PropTypes.number
};

const mapStateToProps = (state) => ({
  offers: state.selectedOffers,
  screenType: state.screenType,
  cities: state.cities,
  activeCity: state.activeCity,
  activeOffer: state.activeOffer,
  sortType: state.sortType
});

export { App };
export default connect(mapStateToProps)(App);
