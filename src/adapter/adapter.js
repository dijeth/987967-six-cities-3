const rawAdapter = {
  city: (rawObj) => {
    const obj = {};
    obj.city = rawObj.city.name;
    return obj;
  },

  [`preview_image`]: (rawObj) => {
    return {};
  },

  images: (rawObj) => {
    const pictures = [rawObj.preview_image].concat(rawObj.images);
    return {pictures};
  },

  title: (rawObj) => {
    const obj = {};
    obj.title = rawObj.title;
    return obj;
  },

  [`is_favorite`]: (rawObj) => {
    const obj = {};
    obj.isFavorite = rawObj.is_favorite;
    return obj;
  },

  [`is_premium`]: (rawObj) => {
    const obj = {};
    obj.isPremium = rawObj.is_premium;
    return obj;
  },

  rating: (rawObj) => {
    const obj = {};
    obj.rating = rawObj.rating;
    return obj;
  },

  type: (rawObj) => {
    const obj = {};
    obj.type = rawObj.type;
    return obj;
  },

  bedrooms: (rawObj) => {
    const obj = {};
    obj.bedroomCount = rawObj.bedrooms;
    return obj;
  },

  [`max_adults`]: (rawObj) => {
    const obj = {};
    obj.adultsCount = rawObj.max_adults;
    return obj;
  },

  price: (rawObj) => {
    const obj = {};
    obj.cost = rawObj.price;
    return obj;
  },

  goods: (rawObj) => {
    const obj = {};
    obj.insideFeatures = rawObj.goods;
    return obj;
  },

  host: (rawObj) => {
    const obj = {};
    const { id, name, is_pro, avatar_url } = rawObj.host;
    obj.userName = name;
    obj.userPicture = avatar_url;
    obj.isUserSuper = is_pro;
    obj.id = id;
    return obj;
  },

  description: (rawObj) => {
    const obj = {};
    obj.description = rawObj.description;
    return obj;
  },

  location: (rawObj) => {
    const {latitude, longitude} = rawObj.location;
    const coord = [latitude, longitude];
    return {coord};
  },

  id: (rawObj) => {
    const obj = {};
    obj.id = String(rawObj.id);
    return obj;
  }
};

const rawToObject = (rawObject) => {
  let data = {};

  Object.keys(rawObject).forEach((key) => {
    data = Object.assign(data, rawAdapter[key](rawObject));
  });

  return data;
}

const Adapter = {
  rawToData: (raw) => {
    const cities = {};
    const data = raw.map((rawObject) => {
      const { name, location } = rawObject.city;
      const { zoom, latitude, longitude } = location;

      cities[name] = {
        name,
        zoom,
        centerCoord: [
          latitude,
          longitude
        ]
      };

      return rawToObject(rawObject)
    });

    return {
      data,
      cities: Array.from(Object.values(cities))
    }
  },

  dataToRaw: () => {}
};

export default Adapter;
