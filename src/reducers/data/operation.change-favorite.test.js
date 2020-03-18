import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {Operation} from './operation.js';
import ActionType from '../action-type.js';
import Adapter from '../../adapter/adapter.js';

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);
const dispatch = jest.fn();

const response = {
  bedrooms: 3,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    name: `Amsterdam`
  },
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    [`avatar_url`]: `img/1.png`,
    id: 3,
    [`is_pro`]: true,
    name: `Angelina`
  },
  id: 5,
  images: [`img/1.png`, `img/2.png`],
  [`is_favorite`]: false,
  [`is_premium`]: false,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  [`max_adults`]: 4,
  [`preview_image`]: `img/1.png`,
  price: 120,
  rating: 4.8,
  title: `Beautiful & luxurious studio at great location`,
  type: `apartment`
};

const convertedResponse = Adapter.getOffer(response);

it(`should call a dispatch once with ActionType.REPLACE_OFFER`, () => {
  apiMock.onPost(`/favorite/5/0`).reply(200, response);

  const loader = Operation.changeFavorite(`5`, `0`);

  return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.REPLACE_OFFER,
        payload: convertedResponse
      });
    });
});

it(`should not call a dispatch when user is not authorized`, () => {
  apiMock.onPost(`/favorite/5/0`).reply(401);

  const loader = Operation.changeFavorite(`5`, `0`);

  return loader(dispatch, () => {}, api)
    .catch(() => {
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
});
