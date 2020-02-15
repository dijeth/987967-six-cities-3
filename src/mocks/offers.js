import { OfferType, CITIES, InsideFeature } from '../const.js';

const getRandomNumber = (maxValue, minValue = 0) => {
  return Math.round(Math.random() * (maxValue - minValue)) + minValue;
};

const getTitleMock = (id) => `Title Offer ${id}`;
const getTypeMock = () => Math.random() > 0.5 ? OfferType.APARTMENT : OfferType.PRIVATE_ROOM;
const getPictureMock = () => `http://picsum.photos/260/200?r=${Math.random()}`;
const getCostMock = () => getRandomNumber(1000);
const getRatingMock = () => getRandomNumber(50) / 10;
const getPremiumMock = () => Math.random() > 0.5;
const getFavoriteMock = () => Math.random() > 0.5;
const getCity = () => CITIES[getRandomNumber(CITIES.length - 1)];
const getBedroomCount = () => getRandomNumber(5);
const getAdultCount = () => getRandomNumber(10);

const getInsediFeatures = () => {
  const features = Object.values(InsideFeature);
  const featureCount = getRandomNumber(features.length, 2);
  const insideFeatures = new Set();
  Array(featureCount).fill(` `).forEach(() => {
    insideFeatures.add(features[getRandomNumber(features.length - 1)]);
  });

  return Array.from(insideFeatures);
};

const MOCK_COUNT = 4;

const offerMocks = Array(MOCK_COUNT).fill(` `).map((it, i) => {
  return {
    id: String(i),
    title: getTitleMock(i),
    type: getTypeMock(),
    pictures: [
      getPictureMock(),
      getPictureMock(),
      getPictureMock(),
      getPictureMock(),
      getPictureMock(),
      getPictureMock()
    ],
    cost: getCostMock(),
    rating: getRatingMock(),
    isPremium: getPremiumMock(),
    isFavorite: getFavoriteMock(),
    city: getCity(),
    bedroomCount: getBedroomCount(),
    adultsCount: getAdultCount(),
    insideFeatures: getInsediFeatures()
  };
});

console.log(offerMocks);

export { offerMocks };
