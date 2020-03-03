import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sortOffers} from '../../util.js';
import {SORT_LIST} from '../../const.js';

const withSort = (Component) => {
  const WithSort = (props) => {
    const {sortType, offers, activeCity} = props;
    const filteredOffers = offers.filter((it) => it.city === activeCity);
    const sortedOffers = sortOffers(filteredOffers, sortType);

    return <Component {...props} offers={sortedOffers} />;
  };

  const mapStateToProps = (state) => ({
    offers: state.offers,
    sortType: state.sortType,
    activeCity: state.activeCity,
    cities: state.cities
  });

  WithSort.propTypes = {
    sortType: PropTypes.oneOf(SORT_LIST).isRequired,
    offers: PropTypes.array.isRequired,
    activeCity: PropTypes.string.isRequired
  };

  return connect(mapStateToProps)(WithSort);
};

export {withSort};
export default withSort;
