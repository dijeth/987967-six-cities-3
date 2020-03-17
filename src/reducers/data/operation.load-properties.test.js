import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {Operation} from './operation.js';
import ActionType from '../action-type.js';
import Adapter from '../../adapter/adapter.js';

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);
const dispatch = jest.fn();
const responseComments = [{
  "comment": `comment-1`,
  "date": `2019-05-08T14:13:56.569Z`,
  "id": 1,
  "rating": 4,
  "user": {
    "avatar_url": `picture-1`,
    "id": 14,
    "is_pro": false,
    "name": `Max-1`
  }
},
{
  "comment": `comment-2`,
  "date": `2019-05-08T14:13:56.569Z`,
  "id": 2,
  "rating": 4,
  "user": {
    "avatar_url": `picture-2`,
    "id": 24,
    "is_pro": false,
    "name": `Max-2`
  }
},
{
  "comment": `comment-3`,
  "date": `2019-05-08T14:13:56.569Z`,
  "id": 3,
  "rating": 4,
  "user": {
    "avatar_url": `picture-3`,
    "id": 34,
    "is_pro": false,
    "name": `Max-3`
  }
}];

const responseNearbyList = [{
  "bedrooms": 11,
  "city": {
    "location": {
      "latitude": 11,
      "longitude": 11,
      "zoom": 11,
    },
    "name": `11`,
  },
  "description": `11`,
  "goods": [`11`],
  "host": {
    "avatar_url": `11`,
    "id": 11,
    "is_pro": true,
    "name": `11`,
  },
  "id": 11,
  "images": [`11`, `11`],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 11,
    "longitude": 11,
    "zoom": 11,
  },
  "max_adults": 11,
  "preview_image": `11`,
  "price": 11,
  "rating": 11,
  "title": `11`,
  "type": `11`,
},
{
  "bedrooms": 22,
  "city": {
    "location": {
      "latitude": 22,
      "longitude": 22,
      "zoom": 22,
    },
    "name": `22`,
  },
  "description": `22`,
  "goods": [`22`],
  "host": {
    "avatar_url": `22`,
    "id": 22,
    "is_pro": true,
    "name": `22`,
  },
  "id": 22,
  "images": [`22`, `22`],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 22,
    "longitude": 22,
    "zoom": 22,
  },
  "max_adults": 22,
  "preview_image": `22`,
  "price": 22,
  "rating": 22,
  "title": `22`,
  "type": `22`,
},
{
  "bedrooms": 33,
  "city": {
    "location": {
      "latitude": 33,
      "longitude": 33,
      "zoom": 33,
    },
    "name": `33`,
  },
  "description": `33`,
  "goods": [`33`],
  "host": {
    "avatar_url": `33`,
    "id": 33,
    "is_pro": true,
    "name": `33`,
  },
  "id": 33,
  "images": [`33`, `33`],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 33,
    "longitude": 33,
    "zoom": 33,
  },
  "max_adults": 33,
  "preview_image": `33`,
  "price": 33,
  "rating": 33,
  "title": `33`,
  "type": `33`,
},
];

const comments = Adapter.getComments(responseComments);
const nearbyList = Adapter.getData(responseNearbyList).offers;

it(`should call a dispatch once whith ActionType.LOAD_COMMENTS`, () => {
  apiMock.onGet(`/comments/1`).reply(200, responseComments);
  apiMock.onGet(`/hotels/1/nearby`).reply(200, responseNearbyList);

  const loader = Operation.loadProperties(`1`);

  return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.INCREASE_LOAD
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.LOAD_NEARBY,
        payload: nearbyList
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.LOAD_COMMENTS,
        payload: comments
      });

      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.DECREASE_LOAD
      });
    });
});
