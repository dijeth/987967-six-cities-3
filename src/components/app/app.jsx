import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';

const handleCardClick = () => {};

const App = ({placesCount, placeCardNames}) => {
  return <Main placesCount={placesCount} placeCardNames={placeCardNames} handleCardClick={handleCardClick} />;
};

App.propTypes = {
  placesCount: PropTypes.number.isRequired,
  placeCardNames: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
