"use strict";
exports.__esModule = true;
exports.OfferType = {
    APARTMENT: "Apartment",
    PRIVATE_ROOM: "Private room"
};
exports.CITIES = [
    "Paris",
    "Cologne",
    "Brussels",
    "Amsterdam",
    "Hamburg",
    "Dusseldorf"
];
exports.InsideFeature = {
    WI_FI: "Wi-Fi",
    WASHING_MACHINE: "Washing machine",
    TOWELS: "Towels",
    HEATING: "Heating",
    COFFEE_MACHINE: "Coffee machine",
    BABY_SEAT: "Baby seat",
    KITCHEN: "Kitchen",
    DISHWASHER: "Dishwasher",
    CABEL_TV: "Cabel TV",
    FRIDGE: "Fridge"
};
exports.ScreenType = {
    MAIN: "MAIN",
    PROPERTY: "PROPERTY"
};
exports.BREAK_STRING = "\n";
exports.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
exports.MAX_CITY_COUNT = 6;
var SortType;
(function (SortType) {
    SortType["POPULAR"] = "Popular";
    SortType["PRICE_LOW_TO_HIGH"] = "Price: low to high";
    SortType["PRICE_HIGH_TO_LOW"] = "Price: high to low";
    SortType["TOP_RATED_FIRST"] = "Top rated first";
})(SortType = exports.SortType || (exports.SortType = {}));
exports.SORT_LIST = [
    SortType.POPULAR,
    SortType.PRICE_LOW_TO_HIGH,
    SortType.PRICE_HIGH_TO_LOW,
    SortType.TOP_RATED_FIRST
];
exports.AuthorizationStatus = {
    NO_AUTH: "NO_AUTH",
    AUTH: "AUTH"
};
exports.AppRoute = {
    getLogin: function () { return "/login"; },
    getOffer: function (id) { return "/offer/" + id; },
    getFavorites: function () { return "/favorites"; },
    getRoot: function () { return "/"; }
};
exports.ServerRoute = {
    getLogin: function () { return "/login"; },
    getFavorites: function () { return "/favorite"; },
    postFavorites: function (id, status) { return "/favorite/" + id + "/" + status; },
    getNearby: function (id) { return "/hotels/" + id + "/nearby"; },
    getHotels: function () { return "/hotels"; },
    getComments: function (id) { return "/comments/" + id; }
};
exports.MAX_IMAGE_COUNT = 6;
exports.ReviewLength = {
    MIN: 50,
    MAX: 300
};
exports.ServerError = {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
};
var PlaceCardType;
(function (PlaceCardType) {
    PlaceCardType["DEFAULT"] = "DEFAULT";
    PlaceCardType["FAVORITE"] = "FAVORITE";
    PlaceCardType["NEARBY"] = "NEARBY";
})(PlaceCardType = exports.PlaceCardType || (exports.PlaceCardType = {}));
exports.EMPTY_REVIEW = {
    text: "",
    rating: 0,
    offerID: null
};
exports.BASE_URL = "https://htmlacademy-react-3.appspot.com/six-cities";
exports.TIME_OUT = 5000;
