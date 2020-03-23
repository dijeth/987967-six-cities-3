export const OfferType = {
  APARTMENT: `Apartment`,
  PRIVATE_ROOM: `Private room`
};

export const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

export const InsideFeature = {
  WI_FI: `Wi-Fi`,
  WASHING_MACHINE: `Washing machine`,
  TOWELS: `Towels`,
  HEATING: `Heating`,
  COFFEE_MACHINE: `Coffee machine`,
  BABY_SEAT: `Baby seat`,
  KITCHEN: `Kitchen`,
  DISHWASHER: `Dishwasher`,
  CABEL_TV: `Cabel TV`,
  FRIDGE: `Fridge`
};

export const ScreenType = {
  MAIN: `MAIN`,
  PROPERTY: `PROPERTY`
};

export const BREAK_STRING = `\n`;

export const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

export const MAX_CITY_COUNT = 6;

export enum SortType {
  POPULAR = `Popular`,
  PRICE_LOW_TO_HIGH = `Price: low to high`,
  PRICE_HIGH_TO_LOW = `Price: high to low`,
  TOP_RATED_FIRST = `Top rated first`,
};

export const SORT_LIST = [
  SortType.POPULAR,
  SortType.PRICE_LOW_TO_HIGH,
  SortType.PRICE_HIGH_TO_LOW,
  SortType.TOP_RATED_FIRST
];

export const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};

export const AppRoute = {
  getLogin: () => `/login`,
  getOffer: (id) => `/offer/${id}`,
  getFavorites: () => `/favorites`,
  getRoot: () => `/`,
};

export const ServerRoute = {
  getLogin: () => `/login`,
  getFavorites: () => `/favorite`,
  postFavorites: (id, status) => `/favorite/${id}/${status}`,
  getNearby: (id) => `/hotels/${id}/nearby`,
  getHotels: () => `/hotels`,
  getComments: (id) => `/comments/${id}`,
};

export const MAX_IMAGE_COUNT = 6;

export const ReviewLength = {
  MIN: 50,
  MAX: 300
};

export const ServerError = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
};

export enum PlaceCardType {
  DEFAULT = `DEFAULT`,
  FAVORITE = `FAVORITE`,
  NEARBY = `NEARBY`,
};

export const EMPTY_REVIEW = {
  text: ``,
  rating: 0,
  offerID: null,
};

export const BASE_URL = `https://htmlacademy-react-3.appspot.com/six-cities`;
export const TIME_OUT = 5000;
