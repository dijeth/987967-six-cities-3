import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {Operation} from './operation.js';
import ActionType from '../action-type.js';
import Adapter from '../../adapter/adapter.js';

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);
const dispatch = jest.fn();

const response = [{
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
  [`is_favorite`]: true,
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
},
{
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
  [`is_favorite`]: true,
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
}];

const convertedResponse = Adapter.getData(response).offers;

it(`should call a dispatch 4 times with correct payloads`, () => {
  apiMock.onGet(`/favorite`).reply(200, response);

  const loader = Operation.updateFavorites();

  return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.INCREASE_LOAD,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.REPLACE_OFFER,
        payload: convertedResponse[0]
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.REPLACE_OFFER,
        payload: convertedResponse[1]
      });

      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.DECREASE_LOAD,
      });
    });
});
