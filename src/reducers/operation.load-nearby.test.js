import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../api.js';
import { Operation } from './operation.js';
import ActionType from './action-type.js';
import Adapter from '../adapter/adapter.js';

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);
const dispatch = jest.fn();
const response = [{
    "bedrooms": 11,
    "city": {
      "location": {
        "latitude": 11,
        "longitude": 11,
        "zoom": 11,
      },
      "name": "11",
    },
    "description": "11",
    "goods": ["11"],
    "host": {
      "avatar_url": "11",
      "id": 11,
      "is_pro": true,
      "name": "11",
    },
    "id": 11,
    "images": ["11", "11"],
    "is_favorite": false,
    "is_premium": false,
    "location": {
      "latitude": 11,
      "longitude": 11,
      "zoom": 11,
    },
    "max_adults": 11,
    "preview_image": "11",
    "price": 11,
    "rating": 11,
    "title": "11",
    "type": "11",
  },
  {
    "bedrooms": 22,
    "city": {
      "location": {
        "latitude": 22,
        "longitude": 22,
        "zoom": 22,
      },
      "name": "22",
    },
    "description": "22",
    "goods": ["22"],
    "host": {
      "avatar_url": "22",
      "id": 22,
      "is_pro": true,
      "name": "22",
    },
    "id": 22,
    "images": ["22", "22"],
    "is_favorite": false,
    "is_premium": false,
    "location": {
      "latitude": 22,
      "longitude": 22,
      "zoom": 22,
    },
    "max_adults": 22,
    "preview_image": "22",
    "price": 22,
    "rating": 22,
    "title": "22",
    "type": "22",
  },
  {
    "bedrooms": 33,
    "city": {
      "location": {
        "latitude": 33,
        "longitude": 33,
        "zoom": 33,
      },
      "name": "33",
    },
    "description": "33",
    "goods": ["33"],
    "host": {
      "avatar_url": "33",
      "id": 33,
      "is_pro": true,
      "name": "33",
    },
    "id": 33,
    "images": ["33", "33"],
    "is_favorite": false,
    "is_premium": false,
    "location": {
      "latitude": 33,
      "longitude": 33,
      "zoom": 33,
    },
    "max_adults": 33,
    "preview_image": "33",
    "price": 33,
    "rating": 33,
    "title": "33",
    "type": "33",
  },
];

const convertedData = Adapter.getData(response);
const convertedOffers = convertedData.offers;

it(`should call a dispatch once whith ActionType.LOAD_NEARBY`, () => {
  apiMock.onGet(`/hotels/1/nearby`).reply(200, response);

  const loader = Operation.loadNearby(`1`);

  return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_NEARBY,
        payload: convertedOffers
      });
    });
});
