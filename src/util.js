const PERCENT_STEP = 20;
export const ratingToPercent = (rating) => Math.round(rating) * PERCENT_STEP;
