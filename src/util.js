import {MONTHS} from './const.js';
import {MAX_CITY_COUNT} from './const.js';

const PERCENT_STEP = 20;
export const ratingToPercent = (rating) => Math.round(rating) * PERCENT_STEP;

export const getReviewDate = (date) => `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

const formatMonth = (month) => month < 9 ? `0${month + 1}` : String(month + 1);

export const getDateTime = (date) => [date.getFullYear(), formatMonth(date.getMonth()), date.getDate()].join(`-`);

export const getCities = (offers) => {
  const citySet = new Set(offers.map((it) => it.city));
  return Array.from(citySet.values()).slice(0, MAX_CITY_COUNT).sort();
};

export const getOffers = (city, offers) => {
  const selectedOffers = [];
  offers.forEach((it) => {
    if (it.city === city) {
      selectedOffers.push(it);
    }
  });

  return selectedOffers;
};

export const isEqualCoords = (coord1, coord2) => coord1[0] === coord2[0] && coord1[1] === coord2[1];
