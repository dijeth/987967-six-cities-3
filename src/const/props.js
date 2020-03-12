import PropTypes from 'prop-types';

export const offerPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
  cost: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  city: PropTypes.string.isRequired,
  coord: PropTypes.arrayOf(PropTypes.number).isRequired
});

export const cityPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  zoom: PropTypes.number,
  centerCoord: PropTypes.arrayOf(PropTypes.number)
});

export const reviewPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userPicture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
})