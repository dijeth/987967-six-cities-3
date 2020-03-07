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

export const CityCoord = {
  [`Paris`]: [48.860758, 2.343110],
  [`Cologne`]: [50.937286, 6.952897],
  [`Brussels`]: [50.859072, 4.352043],
  [`Amsterdam`]: [52.38333, 4.9],
  [`Hamburg`]: [53.540595, 9.995822],
  [`Dusseldorf`]: [51.249977, 6.793917]
};

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

export const BREAK_STRING = `\n`;

export const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

export const ScreenType = {
  MAIN: `MAIN`,
  PROPERTY: `PROPERTY`
};

export const MAX_CITY_COUNT = 6;

export const SortType = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`
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

export const MainScreenType = {
  SIGN_IN: `SIGN_IN`,
  FAVORITES: `FAVORITES`,
  DEFAULT: `DEFAULT`,
}