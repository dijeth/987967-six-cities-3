import Adapter from './adapter.js';

const rawHotels = [{
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
  id: 1,
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
},
{
  id: 2,
  title: `test title`,
}
];

const appHotels = [{
  id: `1`,
  city: `Amsterdam`,
  isFavorite: false,
  isPremium: false,
  title: `Beautiful & luxurious studio at great location`,
  insideFeatures: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  adultsCount: 4,
  cost: 120,
  rating: 4.8,
  type: `apartment`,
  descriptionTitle: `Meet the host`,
  bedroomCount: 3,
  userPicture: `img/1.png`,
  userID: `3`,
  isSuperUser: true,
  userName: `Angelina`,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  pictures: [`img/1.png`, `img/1.png`, `img/2.png`],
  coord: [52.35514938496378, 4.673877537499948],
},
{
  adultsCount: 0,
  bedroomCount: 0,
  city: ``,
  coord: [0, 0],
  cost: 0,
  description: ``,
  descriptionTitle: `Meet the host`,
  id: `2`,
  insideFeatures: [],
  isFavorite: false,
  isPremium: false,
  isSuperUser: ``,
  pictures: [``],
  rating: 0,
  title: `test title`,
  type: ``,
  userID: ``,
  userName: ``,
  userPicture: ``,
}
];

const appCities = [{
  centerCoord: [52.35514938496378, 4.673877537499948],
  name: `Amsterdam`,
  zoom: 8,
}, {
  centerCoord: [0, 0],
  name: ``,
  zoom: 0,
}];

const rawUser = {
  [`avatar_url`]: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 1,
  [`is_pro`]: false,
  name: `Oliver.conner`
};

const appUser = {
  userPic: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: `1`,
  isSuperUser: false,
};

const rawComments = [{
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

const appComments = [{
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  date: `2019-05-08T14:13:56.569Z`,
  id: `1`,
  rating: 4,
  userPicture: `img/1.png`,
  userID: 4,
  isSuperUser: false,
  userName: `Max`
}];

describe(`Adapter`, () => {
  it(`should convert the raw hotel data into an internal application object`, () => {
    expect(Adapter.getData(rawHotels).offers).toEqual(appHotels);
  });

  it(`should generate the city data from raw hotel data`, () => {
    expect(Adapter.getData(rawHotels).cities).toEqual(appCities);
  });

  it(`should convert the raw user data into an internal application object`, () => {
    expect(Adapter.getUser(rawUser)).toEqual(appUser);
  });

  it(`should convert the raw comment data into an internal application object`, () => {
    expect(Adapter.getComments(rawComments)).toEqual(appComments);
  });

  it(`should convert the raw favorite's flag into "0" or "1"`, () => {
    expect(Adapter.postFavorite(true)).toEqual(`1`);
    expect(Adapter.postFavorite(false)).toEqual(`0`);
  });
});
