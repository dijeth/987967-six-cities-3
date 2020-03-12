import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../api.js';
import {Operation} from './operation.js';
import ActionType from './action-type.js';

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);
const dispatch = jest.fn();
const response = [{
  id: `1`,
  city: {
    location: {
      latitude: 1,
      longitude: 2,
      zoom: 10
    },
    name: `Amsterdam`
  },
},
{
  id: `2`,
  city: {
    location: {
      latitude: 3,
      longitude: 4,
      zoom: 10
    },
    name: `London`
  },
}
];

it(`should call a dispatch for 5 times`, () => {
  apiMock.onGet(`/hotels`).reply(200, response);

  const loader = Operation.loadOffers();

  return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(5);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_LOADING_STATUS,
        payload: true
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.LOAD_OFFERS,
        payload: [{
          id: `1`,
          city: `Amsterdam`,
        },
        {
          id: `2`,
          city: `London`,
        }
        ]
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.LOAD_CITIES,
        payload: [{
          centerCoord: [1, 2],
          name: `Amsterdam`,
          zoom: 10
        },
        {
          centerCoord: [3, 4],
          name: `London`,
          zoom: 10
        }
        ]
      });

      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.CHANGE_CITY,
        payload: {
          centerCoord: [1, 2],
          name: `Amsterdam`,
          zoom: 10
        }
      });

      expect(dispatch).toHaveBeenNthCalledWith(5, {
        type: ActionType.CHANGE_LOADING_STATUS,
        payload: false
      });
    });
});
