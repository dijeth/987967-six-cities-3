const FavoriteStatus = {
  ON: `1`,
  OFF: `0`,
};

const Converter = {
  getComment: (raw) => ({
    id: String(raw.id || ``),
    userName: raw.user?.name || ``,
    userPicture: raw.user?.[`avatar_url`] || ``,
    userID: raw.user?.id || ``,
    isSuperUser: raw.user?.[`is_pro`] || false,
    rating: raw.rating || 0,
    description: raw.comment || ``,
    date: raw.date || ``,
  }),

  getUser: (raw) => ({
    id: String(raw.id || ``),
    userPic: raw[`avatar_url`] || ``,
    email: raw.email || ``,
    isSuperUser: raw[`is_pro`] || false,
  }),

  getOffer: (raw) => ({
    id: String(raw.id || ``),
    city: raw.city?.name || ``,
    pictures: (raw[`preview_image`]? [raw[`preview_image`]] : []).concat(raw.images || []),
    title: raw.title || ``,
    descriptionTitle: `Meet the host`,
    isFavorite: raw[`is_favorite`] || false,
    isPremium: raw[`is_premium`] || false,
    rating: raw.rating || 0,
    type: raw.type || ``,
    bedroomCount: raw.bedrooms || 0,
    adultsCount: raw[`max_adults`] || 0,
    cost: raw.price || 0,
    insideFeatures: raw.goods || [],
    userName: raw.host?.name || ``,
    userPicture: raw.host?.[`avatar_url`] || ``,
    isSuperUser: raw.host?.[`is_pro`] || false,
    userID: String(raw.host?.id || ``),
    description: raw.description || ``,
    coord: [raw.location?.latitude || 0, raw.location?.longitude || 0],
    zoom: raw.location?.zoom || 0
  }),

  getCity: (raw) => ({
    name: raw.city?.name || ``,
    zoom: raw.city?.location?.zoom || 0,
    centerCoord: [raw.city?.location?.latitude || 0, raw.city?.location?.longitude || 0]
  })
};

const Adapter = {
  getData: (rawData) => {
    const offers = [];
    const cities = {};

    rawData.forEach((it) => {
      offers.push(Converter.getOffer(it));

      const city = Converter.getCity(it);
      cities[city.name] = city;
    });

    return {offers, cities: Array.from(Object.values(cities))};
  },

  getOffer: (raw) => Converter.getOffer(raw),

  getUser: (rawData) => Converter.getUser(rawData),

  getComments: (rawData) => rawData.map((it) => Converter.getComment(it)),

  postFavorite: (isFavorite) => isFavorite ? FavoriteStatus.ON : FavoriteStatus.OFF,
};

export default Adapter;
