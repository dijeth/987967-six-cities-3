import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {Operation} from './operation.js';
import ActionType from '../action-type.js';
import Adapter from '../../adapter/adapter.js';

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);

const response = [{
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  date: `2019-05-08T14:13:56.569Z`,
  id: 1,
  rating: 4,
  user: {
    [`avatar_url`]: `img/1.png`,
    id: 4,
    [`is_pro`]: false,
    name: `Max`
  }
}];

const convertedComments = Adapter.getComments(response);

it(`should call a dispatch 4 times with correct payloads when user is authorized`, () => {
  const dispatch = jest.fn();

  apiMock.onPost(`/comments/1`, `test-comment`).reply(200, response);

  const loader = Operation.submitComment(`test-comment`, `1`);

  return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_COMMENT_SENDING_STATUS,
        payload: true
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.LOAD_COMMENTS,
        payload: convertedComments
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.SET_COMMENT_ERROR,
        payload: false
      });

      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.CHANGE_COMMENT_SENDING_STATUS,
        payload: false
      });
    });
});

it(`should call a dispatch 3 times with correct payloads when user is not authorized`, () => {
  const dispatch = jest.fn();

  apiMock.onPost(`/comments/1`, `test-comment`).reply(401);

  const loader = Operation.submitComment(`test-comment`, `1`);

  return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_COMMENT_SENDING_STATUS,
        payload: true
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.SET_COMMENT_ERROR,
        payload: true
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_COMMENT_SENDING_STATUS,
        payload: false
      });
    });
});
