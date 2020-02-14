const OfferType = {
  APARTMENT: `Apartment`,
  PRIVATE_ROOM: `Private room`
};

const offerMocks = [{
    title: `Title Offer 1`,
    type: Math.random() > 0.5 ? OfferType.APARTMENT : OfferType.PRIVATE_ROOM,
    picture: `http://picsum.photos/260/200?r=${Math.random()}`,
    cost: Math.round(Math.random() * 1000),
    rating: Math.round(Math.random() * 4) + 1,
    isPremium: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  },
  {
    title: `Title Offer 2`,
    type: Math.random() > 0.5 ? OfferType.APARTMENT : OfferType.PRIVATE_ROOM,
    picture: `http://picsum.photos/260/200?r=${Math.random()}`,
    cost: Math.round(Math.random() * 1000),
    rating: Math.round(Math.random() * 4) + 1,
    isPremium: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  },
  {
    title: `Title Offer 3`,
    type: Math.random() > 0.5 ? OfferType.APARTMENT : OfferType.PRIVATE_ROOM,
    picture: `http://picsum.photos/260/200?r=${Math.random()}`,
    cost: Math.round(Math.random() * 1000),
    rating: Math.round(Math.random() * 4) + 1,
    isPremium: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  },
  {
    title: `Title Offer 4`,
    type: Math.random() > 0.5 ? OfferType.APARTMENT : OfferType.PRIVATE_ROOM,
    picture: `http://picsum.photos/260/200?r=${Math.random()}`,
    cost: Math.round(Math.random() * 1000),
    rating: Math.round(Math.random() * 4) + 1,
    isPremium: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  },
  {
    title: `Title Offer 5`,
    type: Math.random() > 0.5 ? OfferType.APARTMENT : OfferType.PRIVATE_ROOM,
    picture: `http://picsum.photos/260/200?r=${Math.random()}`,
    cost: Math.round(Math.random() * 1000),
    rating: Math.round(Math.random() * 4) + 1,
    isPremium: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  }
];

export default offerMocks;
