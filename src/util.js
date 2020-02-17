const PERCENT_STEP = 20;
const ratingToPercent = (rating) => Math.round(rating) * PERCENT_STEP;

export {ratingToPercent};
