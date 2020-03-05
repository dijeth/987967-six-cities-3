const rawAdapter = {
  city: (rawObj) => {
    return { city: rawObj.city.name };
  },

  [`preview_image`]: (rawObj) => {
    return {};
  },

  images: (rawObj) => {
    return { pictures: [rawObj.preview_image].concat(rawObj.images) };
  },

  title: (rawObj) => {
    return { title: rawObj.title, descriptionTitle: rawObj.title };
  },

  [`is_favorite`]: (rawObj) => {
    return { isFavorite: rawObj.is_favorite };
  },

  [`is_premium`]: (rawObj) => {
    return { isPremium: rawObj.is_premium };
  },

  rating: (rawObj) => {
    return { rating: rawObj.rating };
  },

  type: (rawObj) => {
    return { type: rawObj.type };
  },

  bedrooms: (rawObj) => {
    return { bedroomCount: rawObj.bedrooms };
  },

  [`max_adults`]: (rawObj) => {
    return { adultsCount: rawObj.max_adults };
  },

  price: (rawObj) => {
    return { cost: rawObj.price };
  },

  goods: (rawObj) => {
    return { insideFeatures: rawObj.goods };
  },

  host: (rawObj) => {
    const { id, name, is_pro, avatar_url } = rawObj.host;
    return {
      userName: name,
      userPicture: avatar_url,
      isUserSuper: is_pro,
      id: id
    };
  },

  description: (rawObj) => {
    return { description: rawObj.description };
  },

  location: (rawObj) => {
    const { latitude, longitude } = rawObj.location;
    const coord = [latitude, longitude];
    return { coord };
  },

  id: (rawObj) => {
    return { id: String(rawObj.id) };
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
