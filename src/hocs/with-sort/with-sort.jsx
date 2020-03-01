import React from 'react';
import { connect } from 'react-redux';
import { ScreenType, SORT_LIST } from '../../const.js';
import { sortOffers } from '../../util.js';

const withSort = (Component) => {
  const WithSort = (props) => {
    const { sortType, offers, activeCity, cities } = props;
    const filteredOffers = offers.filter((it) => it.city === activeCity);
    const sortedIDs = sortOffers(filteredOffers, sortType ).map((it) => it.id);

    return <Component {...props} sortedIDs={sortedIDs} />
  };

  const mapStateToProps = (state) => ({
    offers: state.offers,
    sortType: state.sortType,
    activeCity: state.activeCity,
    cities: state.cities
  });

  return connect(mapStateToProps)(WithSort);
}

export default withSort;
