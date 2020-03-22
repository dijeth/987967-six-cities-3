const FavoriteStatus = {
  ON: `1`,
  OFF: `0`
};

const get = (object, path, defaultValue) => {
  const paths = path.split(`.`);
  const result = paths.reduce((accu, elem) => {
    return accu === undefined ? undefined : accu[elem];
  }, object);

  return result === undefined ? defaultValue : result;
};

const Converter = {
  getComment: (raw) => ({
    id: String(get(raw, `id`, ``)),
    userName: get(raw, `user.name`, ``),
    userPicture: get(raw, `user.avatar_url`, ``),
    userID: get(raw, `user.id`, ``),
    isSuperUser: get(raw, `user.is_pro`, false),
    rating: get(raw, `rating`, 0),
    description: get(raw, `comment`, ``),
    date: get(raw, `date`, ``),
  }),

  getUser: (raw) => ({
    id: String(get(raw, `id`, ``)),
    userPic: get(raw, `avatar_url`, ``),
    email: get(raw, `email`, ``),
    isSuperUser: get(raw, `is_pro`, false),
  }),

  getOffer: (raw) => ({
    id: String(get(raw, `id`, ``)),
    city: get(raw, `city.name`, ``),

    pictures: (() => {
      const firstImage = get(raw, `preview_image`, null);
      const images = get(raw, `images`, []);
      return (firstImage === null ? [] : [firstImage]).concat(images);
    })(),

    title: get(raw, `title`, ``),
    descriptionTitle: `Meet the host`,
    isFavorite: get(raw, `is_favorite`, false),
    isPremium: get(raw, `is_premium`, false),
    rating: get(raw, `rating`, 0),
    type: get(raw, `type`, ``),
    bedroomCount: get(raw, `bedrooms`, 0),
    adultsCount: get(raw, `max_adults`, 0),
    cost: get(raw, `price`, 0),
    insideFeatures: get(raw, `goods`, []),
    userName: get(raw, `host.name`, ``),
    userPicture: get(raw, `host.avatar_url`, ``),
    isSuperUser: get(raw, `host.is_pro`, false),
    userID: String(get(raw, `host.id`, ``)),
    description: get(raw, `description`, ``),
    coord: [get(raw, `location.latitude`, 0), get(raw, `location.longitude`, 0)],
    zoom: get(raw, `location.zoom`, 0),
  }),

  getCity: (raw) => ({
    name: get(raw, `city.name`, ``),
    zoom: get(raw, `city.location.zoom`, 0),
    centerCoord: [
      get(raw, `city.location.latitude`, 0),
      get(raw, `city.location.longitude`, 0),
    ]
  })
};

const Adapter = {
  getData: (rawData) => {
    if (!Array.isArray(rawData)) {
      rawData = [];
    }

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

  getComments: (rawData) => {
    if (!Array.isArray(rawData)) {
      rawData = [];
    }

    return rawData.map((it) => Converter.getComment(it));
  },

  postFavorite: (isFavorite) =>
    isFavorite ? FavoriteStatus.ON : FavoriteStatus.OFF
};

export default Adapter;
