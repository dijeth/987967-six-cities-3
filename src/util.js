import {MONTHS, SortType, CITIES} from './const/const';

const PERCENT_STEP = 20;
export const ratingToPercent = (rating) => Math.round(rating) * PERCENT_STEP;

export const getReviewDate = (date) => `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

const formatMonth = (month) => month < 9 ? `0${month + 1}` : String(month + 1);

export const getDateTime = (date) => [date.getFullYear(), formatMonth(date.getMonth()), date.getDate()].join(`-`);

export const getCities = () => {
  return CITIES;
};

export const isEqualCoords = (coord1, coord2) => coord1[0] === coord2[0] && coord1[1] === coord2[1];

export const indexOf = (element) => {
  return Array.from(element.parentElement.children).indexOf(element);
};

export const sortOffers = (offers, sortType) => {
  switch (sortType) {
    case SortType.PRICE_LOW_TO_HIGH:
      return offers.slice().sort((a, b) => a.cost - b.cost);

    case SortType.PRICE_HIGH_TO_LOW:
      return offers.slice().sort((a, b) => b.cost - a.cost);

    case SortType.TOP_RATED_FIRST:
      return offers.slice().sort((a, b) => b.rating - a.rating);

    case SortType.POPULAR:
    default:
      return offers;
  }
};

export const compareObjects = (object1, object2) => {
  return JSON.stringify(object1) === JSON.stringify(object2);
};
