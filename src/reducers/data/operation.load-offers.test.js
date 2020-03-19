import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {Operation} from './operation.js';
import ActionType from '../action-type.js';
import Adapter from '../../adapter/adapter.js';

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);
const dispatch = jest.fn();
const response = [{
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 52.370216,
      "longitude": 4.895168,
      "zoom": 10
    },
    "name": `Amsterdam`
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  "host": {
    "avatar_url": `img/1.png`,
    "id": 3,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 1,
  "images": [`img/1.png`, `img/2.png`],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 52.35514938496378,
    "longitude": 4.673877537499948,
    "zoom": 8
  },
  "max_adults": 4,
  "preview_image": `img/1.png`,
  "price": 120,
  "rating": 4.8,
  "title": `Beautiful & luxurious studio at great location`,
  "type": `apartment`
},
{
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 52.370216,
      "longitude": 4.895168,
      "zoom": 10
    },
    "name": `London`
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  "host": {
    "avatar_url": `img/1.png`,
    "id": 3,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 2,
  "images": [`img/1.png`, `img/2.png`],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 52.35514938496378,
    "longitude": 4.673877537499948,
    "zoom": 8
  },
  "max_adults": 4,
  "preview_image": `img/1.png`,
  "price": 120,
  "rating": 4.8,
  "title": `Beautiful & luxurious studio at great location`,
  "type": `apartment`
}
];

const convertedData = Adapter.getData(response);
const convertedOffers = convertedData.offers;
const convertedCities = convertedData.cities;

it(`should call a dispatch for 5 times`, () => {
  apiMock.onGet(`/hotels`).reply(200, response);

  const loader = Operation.loadOffers();

  return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(5);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.INCREASE_LOAD,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.LOAD_OFFERS,
        payload: convertedOffers
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.LOAD_CITIES,
        payload: convertedCities
      });

      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.CHANGE_CITY,
        payload: convertedCities[0].name
      });

      expect(dispatch).toHaveBeenNthCalledWith(5, {
        type: ActionType.DECREASE_LOAD,
      });
    });
});
