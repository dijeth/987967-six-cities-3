import {OfferType, CITIES} from '../const.js';

const getTitleMock = (id) => `Title Offer ${id}`;
const getTypeMock = () => Math.random() > 0.5 ? OfferType.APARTMENT : OfferType.PRIVATE_ROOM;
const getPictureMock = () => `http://picsum.photos/260/200?r=${Math.random()}`;
const getCostMock = () => Math.round(Math.random() * 1000);
const getRatingMock = () => Math.round(Math.random() * 5) * 20;
const getPremiumMock = () => Math.random() > 0.5;
const getFavoriteMock = () => Math.random() > 0.5;
const getCity = () => CITIES[Math.round(Math.random() * (CITIES.length - 1))];

const MOCK_COUNT = 4;

const offerMocks = Array(MOCK_COUNT).fill(` `).map((it, i) => {
  return {
    id: String(i),
    title: getTitleMock(i),
    type: getTypeMock(),
    picture: getPictureMock(),
    cost: getCostMock(),
    rating: getRatingMock(),
    isPremium: getPremiumMock(),
    isFavorite: getFavoriteMock(),
    city: getCity()
  };
});

export {offerMocks};
