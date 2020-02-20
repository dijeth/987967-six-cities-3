import {MONTHS} from './const.js';

const PERCENT_STEP = 20;
export const ratingToPercent = (rating) => Math.round(rating) * PERCENT_STEP;

export const getReviewDate = (date) => `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

const formatMonth = (month) => month < 9 ? `0${month + 1}` : String(month + 1);

export const getDateTime = (date) => [date.getFullYear(), formatMonth(date.getMonth()), date.getDate()].join(`-`);

