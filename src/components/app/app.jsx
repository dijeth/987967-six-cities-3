import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';

const handleCardClick = () => {};

const App = ({placesCount, offerList}) => {
  return <Main placesCount={placesCount} offerList={offerList} onCardClick={handleCardClick} />;
};

App.propTypes = {
  placesCount: PropTypes.number.isRequired,
  offerList: PropTypes.array.isRequired
};

export default App;
