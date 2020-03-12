const Converter = {
  getComment: (raw) => ({
    id: String(raw.id),
    userName: raw.user.name,
    userPicture: raw.user[`avatar_url`],
    userID: raw.user.id,
    isSuperUser: raw.user[`is_pro`],
    rating: raw.rating,
    description: raw.comment,
    date: raw.date,
  }),

  getUser: (raw) => ({
    id: String(raw.id),
    userPic: raw[`avatar_url`],
    email: raw.email,
    isSuperUser: raw[`is_pro`]
  }),

  getOffer: (raw) => ({
    id: String(raw.id),
    city: raw.city.name,
    pictures: [raw[`preview_image`]].concat(raw.images),
    title: raw.title,
    descriptionTitle: raw.title,
    isFavorite: raw[`is_favorite`],
    isPremium: raw[`is_premium`],
    rating: raw.rating,
    type: raw.type,
    bedroomCount: raw.bedrooms,
    adultsCount: raw[`max_adults`],
    cost: raw.price,
    insideFeatures: raw.goods,
    userName: raw.host.name,
    userPicture: raw.host[`avatar_url`],
    isSuperUser: raw.host[`is_pro`],
    userID: String(raw.host.id),
    description: raw.description,
    coord: [raw.location.latitude, raw.location.longitude]
  }),

  getCity: (raw) => ({
    name: raw.city.name,
    zoom: raw.location.zoom,
    centerCoord: [raw.location.latitude, raw.location.longitude]    
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

    return {offers, cities: Array.from(Object.values(cities))}
  },

  getUser: (rawData) => Converter.getUser(rawData),

  getComments: (rawData) => rawData.map((it) => Converter.getComment(it))
};

export default Adapter;
