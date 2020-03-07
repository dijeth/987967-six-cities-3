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

it(`should call a dispatch for three times`, () => {
  apiMock.onGet(`/hotels`).reply(200, response);

  const loader = Operation.loadOffers();

  return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
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

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_CITY,
        payload: {
          centerCoord: [1, 2],
          name: `Amsterdam`,
          zoom: 10
        }
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
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

    });
});
