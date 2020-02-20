import {OfferType, /* CITIES,*/ InsideFeature} from '../const.js';

const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const WORDS = [`Fusce`, `Risus`, `Magna`, `Rutrum`, `Sit`, `Amet`, `Ex`, `Quis`, `Tincidunt`, `Varius`, `Ligula`];

const PARAGRAPHS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce risus magna, rutrum sit amet ex quis, tincidunt varius ligula. Praesent libero velit, ultricies nec purus non, semper auctor leo. Nam non euismod ligula. Sed finibus, risus sed suscipit malesuada, purus lacus pulvinar risus, a egestas augue arcu non erat. Cras magna sem, vehicula nec posuere nec, congue a elit. Morbi pharetra pulvinar diam sed facilisis. Maecenas efficitur massa tellus, at semper massa congue eget. Maecenas eu tincidunt dui. Suspendisse ac ullamcorper quam. Integer et imperdiet ipsum. Morbi lectus risus, eleifend et justo ac, finibus varius nunc. Sed bibendum finibus urna, eu porta urna accumsan id. In sem libero, sagittis ultricies ornare eleifend, lobortis sit amet enim. Quisque hendrerit, metus sed dictum volutpat, ex orci pulvinar mi, posuere faucibus nisl risus eu orci. In fringilla nibh quis turpis semper dapibus. Sed augue erat, suscipit a sodales nec, blandit non lectus.`,
  `Maecenas tellus risus, eleifend vitae lorem vitae, iaculis varius tortor. Morbi vehicula ultrices elit a lobortis. Aliquam non metus lacinia, rhoncus orci ac, pretium augue. Aenean vehicula facilisis metus sit amet ultricies. In scelerisque velit tristique lectus vulputate, iaculis sodales sapien congue. Etiam nisl enim, scelerisque sed vestibulum eget, dapibus vitae lorem. Nunc eleifend nunc vel lectus blandit aliquam. Morbi lectus turpis, imperdiet ut quam ac, lacinia finibus justo. Suspendisse lobortis mauris ac auctor faucibus. Proin a sapien nisl. Ut risus ex, hendrerit sed ultrices at, lobortis a tortor. Nullam ex lectus, elementum at leo ut, rhoncus tincidunt metus. Donec justo lacus, suscipit ac egestas at, aliquet non eros. Duis magna mi, aliquam at convallis sit amet, pharetra et mi.`,
  `Ut aliquam eleifend tincidunt. Donec faucibus sapien fermentum vestibulum pulvinar. Etiam magna lorem, semper quis lacus ac, tempus gravida ante. Aliquam erat volutpat. Nullam nec imperdiet ligula. Cras at enim eget lacus iaculis auctor. Donec eu vulputate tellus.`,
  `Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc aliquet quam ut aliquam elementum. Cras vitae ligula eget nisi sollicitudin finibus. Nulla eu semper metus, sit amet euismod arcu. Aenean id lacus eget purus cursus tempor. Nunc eros diam, sollicitudin nec nibh vel, viverra scelerisque neque. Mauris elementum ac ipsum non consequat. Morbi sem metus, condimentum id lobortis eu, iaculis pharetra neque. Nullam eu velit at purus rhoncus pharetra sit amet non eros. Duis ante nibh, faucibus non metus vitae, blandit congue purus. Phasellus eget suscipit justo, vitae volutpat justo. Ut ac pharetra eros. Suspendisse convallis in elit ac aliquet. In consectetur auctor ipsum, vitae tempus sem posuere at. Maecenas justo nisi, viverra quis sollicitudin eget, malesuada ut nibh.`,
  `Morbi placerat cursus nibh imperdiet tempus. Praesent aliquam nibh venenatis velit posuere tincidunt. Nam vel ligula vitae ligula mattis cursus. Cras volutpat semper diam, eu posuere ligula pharetra at. Integer gravida neque quis mi malesuada, id facilisis turpis lobortis. Aliquam dapibus, ipsum a luctus malesuada, ante tellus pretium orci, at rutrum leo sapien commodo mi. Vivamus viverra sed ipsum vitae vehicula.`,
  `Ut ultricies ultrices vestibulum. Mauris lectus justo, pellentesque sit amet egestas sed, rutrum id purus. Cras rutrum tortor vehicula risus tincidunt, convallis malesuada nisl pretium. Aenean aliquet, ante ut laoreet lacinia, diam massa blandit mauris, nec sagittis felis velit eu diam. Quisque semper, nibh eu consequat ultrices, felis dui gravida felis, ut tincidunt odio ipsum in purus. Morbi sagittis id ipsum a vulputate. Quisque massa neque, interdum molestie erat et, suscipit lacinia nunc.`,
  `Mauris et imperdiet nulla, nec mattis sapien. Morbi vitae turpis ac elit porta ultricies vitae eu ex. Donec convallis feugiat condimentum. Duis blandit accumsan velit nec aliquet. In varius nibh sit amet neque consequat, a ultrices urna egestas. Proin sit amet pharetra diam. Integer viverra ipsum quis leo fringilla, ac blandit lorem mattis. Vestibulum vitae diam id nunc sollicitudin venenatis. Phasellus posuere tellus est, sed pulvinar massa feugiat sit amet. Phasellus venenatis eros id felis ullamcorper, eget ultricies turpis volutpat.`
];

const SHORT_PARAGRAPHS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Maecenas tellus risus, eleifend vitae lorem vitae, iaculis varius tortor`,
  `Ut aliquam eleifend tincidunt`,
  `Class aptent taciti sociosqu`,
  `Morbi placerat cursus nibh imperdiet tempus`,
  `Ut ultricies ultrices vestibulum`,
  `Mauris et imperdiet nulla, nec mattis sapien`
];

const getRandomNumber = (maxValue, minValue = 0) => {
  return Math.round(Math.random() * (maxValue - minValue)) + minValue;
};

const getRandomElement = (array) => {
  return array[getRandomNumber(array.length - 1)];
};

const getRandomBoolean = () => Math.random() > 0.5;

const getTitleMock = (id) => `Title Offer ${id}`;
const getTypeMock = () => getRandomBoolean() ? OfferType.APARTMENT : OfferType.PRIVATE_ROOM;
const getPictureMock = () => `http://picsum.photos/260/200?r=${Math.random()}`;
const getCostMock = () => getRandomNumber(1000, 10);
const getRatingMock = () => getRandomNumber(50) / 10;
const getPremiumMock = () => getRandomBoolean();
const getFavoriteMock = () => getRandomBoolean();
const getCity = () => `Amsterdam`;
// const getCity = () => getRandomElement(CITIES);
const getBedroomCount = () => getRandomNumber(5);
const getAdultCount = () => getRandomNumber(10, 1);

const getInsediFeatures = () => {
  const features = Object.values(InsideFeature);
  const featureCount = getRandomNumber(features.length, 2);
  const insideFeatures = new Set();
  Array(featureCount).fill(` `).forEach(() => {
    insideFeatures.add(features[getRandomNumber(features.length - 1)]);
  });

  return Array.from(insideFeatures);
};

const getUserName = () => getRandomElement(WORDS);
const getUserPicture = () => `https://api.adorable.io/avatars/74/${Math.random()}`;
const getIsUserSuper = () => getRandomBoolean();
const getDescription = () => [getRandomElement(PARAGRAPHS), getRandomElement(PARAGRAPHS)].join(`\n`);
const getDescriptionTitle = () => getRandomElement(SHORT_PARAGRAPHS);
const getCoordinates = () => [52.3 + getRandomNumber(84491, 52884) / 1000000, 4 + getRandomNumber(933742, 875206) / 1000000];

const getDate = () => {
  const dateValue = getRandomNumber(new Date().valueOf());
  const date = new Date(dateValue);

  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`
};

const getReviews = () => Array(getRandomNumber(5)).fill(` `).map((it, i) => getReview(i));
const getReview = (id) => {
  return {
    id,
    userName: getRandomElement(WORDS),
    userPicture: getUserPicture(),
    rating: getRatingMock(),
    description: getDescription(),
    date: getDate()
  }
}

const MOCK_COUNT = 4;

const offerMocks = Array(MOCK_COUNT).fill(` `).map((it, i) => {
  return {
    id: String(i),
    title: getTitleMock(i),
    type: getTypeMock(),
    pictures: [
      getPictureMock(),
      getPictureMock(),
      getPictureMock(),
      getPictureMock(),
      getPictureMock(),
      getPictureMock()
    ],
    cost: getCostMock(),
    rating: getRatingMock(),
    isPremium: getPremiumMock(),
    isFavorite: getFavoriteMock(),
    city: getCity(),
    bedroomCount: getBedroomCount(),
    adultsCount: getAdultCount(),
    insideFeatures: getInsediFeatures(),
    userName: getUserName(),
    userPicture: getUserPicture(),
    isUserSuper: getIsUserSuper(),
    descriptionTitle: getDescriptionTitle(),
    description: getDescription(),
    coord: getCoordinates(),
    reviews: getReviews()
  };
});

console.log(offerMocks);

export {offerMocks};
