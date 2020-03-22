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
  zoom: 8,
},
];

const appCities = [{
  centerCoord: [52.370216, 4.895168],
  name: `Amsterdam`,
  zoom: 10,
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

const defaultHotels = [{
  id: ``,
  city: ``,
  isFavorite: false,
  isPremium: false,
  title: ``,
  insideFeatures: [],
  adultsCount: 0,
  cost: 0,
  rating: 0,
  type: ``,
  descriptionTitle: `Meet the host`,
  bedroomCount: 0,
  userPicture: ``,
  userID: ``,
  isSuperUser: false,
  userName: ``,
  description: ``,
  pictures: [],
  coord: [0, 0],
  zoom: 0,
}];

const defaultCities = [{
  centerCoord: [0, 0],
  name: ``,
  zoom: 0,
}];

const defaultUser = {
  userPic: ``,
  email: ``,
  id: ``,
  isSuperUser: false,
};

const defaultComments = [{
  description: ``,
  date: ``,
  id: ``,
  rating: 0,
  userPicture: ``,
  userID: ``,
  isSuperUser: false,
  userName: ``,
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

  it(`should return the default hotel data when raw is invalid`, () => {
    expect(Adapter.getData([{}]).offers).toEqual(defaultHotels);
  });

  it(`should return the default city data when raw is invalid`, () => {
    expect(Adapter.getData([{}]).cities).toEqual(defaultCities);
  });

  it(`should return the default user data when raw is invalid`, () => {
    expect(Adapter.getUser({})).toEqual(defaultUser);
  });

  it(`should return the default comment data when raw is invalid`, () => {
    expect(Adapter.getComments([{}])).toEqual(defaultComments);
  });

  it(`should return the empty hotel data when raw has wrong format`, () => {
    expect(Adapter.getData(`wrong format`)).toEqual({offers: [], cities: []});
  });

  it(`should return the empty comment data when raw has wrong format`, () => {
    expect(Adapter.getComments(`wrong format`)).toEqual([]);
  });
});
