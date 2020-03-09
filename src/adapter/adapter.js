const rawAdapter = {
  city: (rawObj) => ({city: rawObj.city.name}),

  [`preview_image`]: () => ({}),

  images: (rawObj) => ({pictures: [rawObj.preview_image].concat(rawObj.images)}),

  title: (rawObj) => ({title: rawObj.title, descriptionTitle: rawObj.title}),

  [`is_favorite`]: (rawObj) => ({isFavorite: rawObj.is_favorite}),

  [`is_premium`]: (rawObj) => ({isPremium: rawObj.is_premium}),

  rating: (rawObj) => ({rating: rawObj.rating}),

  type: (rawObj) => ({type: rawObj.type}),

  bedrooms: (rawObj) => ({bedroomCount: rawObj.bedrooms}),

  [`max_adults`]: (rawObj) => ({adultsCount: rawObj.max_adults}),

  price: (rawObj) => ({cost: rawObj.price}),

  goods: (rawObj) => ({insideFeatures: rawObj.goods}),

  host: (rawObj) => {
    const {id, name, is_pro: isPro, avatar_url: avatarUrl} = rawObj.host;
    return {
      userName: name,
      userPicture: avatarUrl,
      isUserSuper: isPro,
      id
    };
  },

  description: (rawObj) => ({description: rawObj.description}),

  location: (rawObj) => {
    const {latitude, longitude} = rawObj.location;
    const coord = [latitude, longitude];
    return {coord};
  },

  id: (rawObj) => ({id: String(rawObj.id)})
};

const rawToObject = (rawObject) => {
  let data = {};

  Object.keys(rawObject).forEach((key) => {
    data = Object.assign(data, rawAdapter[key](rawObject));
  });

  return data;
};

const Adapter = {
  rawToData: (raw) => {
    const cities = {};
    const data = raw.map((rawObject) => {
      const {name, location} = rawObject.city;
      const {zoom, latitude, longitude} = location;

      cities[name] = {
        name,
        zoom,
        centerCoord: [
          latitude,
          longitude
        ]
      };

      return rawToObject(rawObject);
    });

    return {
      data,
      cities: Array.from(Object.values(cities))
    };
  },

  rawUserToData: (raw) => ({
    id: raw.id,
    userPic: raw[`avatar_url`],
    email: raw.email,
    isSuperUser: raw[`is_pro`]
  }),

  dataToRaw: () => {}
};

export default Adapter;
