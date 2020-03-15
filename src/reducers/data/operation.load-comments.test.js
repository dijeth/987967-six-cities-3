import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../api.js';
import {Operation} from './operation.js';
import ActionType from './action-type.js';
import Adapter from '../adapter/adapter.js';

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);
const dispatch = jest.fn();
const response = [{
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

const comments = Adapter.getComments(response);

it(`should call a dispatch once whith ActionType.LOAD_COMMENTS`, () => {
  apiMock.onGet(`/comments/1`).reply(200, response);

  const loader = Operation.loadComments(`1`);

  return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_COMMENTS,
        payload: comments
      });
    });
});
