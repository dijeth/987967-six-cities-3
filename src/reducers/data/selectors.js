"use strict";
exports.__esModule = true;
var name_space_js_1 = require("../name-space.js");
exports.getOffers = function (state) { return state[name_space_js_1["default"].DATA].offers; };
exports.getCities = function (state) { return state[name_space_js_1["default"].DATA].cities; };
exports.getNearbyList = function (state) { return state[name_space_js_1["default"].DATA].nearbyList; };
exports.getComments = function (state) { return state[name_space_js_1["default"].DATA].comments; };
exports.getFavorites = function (state) {
    var favoriteOffers = state[name_space_js_1["default"].DATA].offers.filter(function (it) { return it.isFavorite; });
    var splittedOffers = {};
    favoriteOffers.forEach(function (it) {
        var city = it.city;
        if (splittedOffers[city] === undefined) {
            splittedOffers[city] = [it];
        }
        else {
            splittedOffers[city].push(it);
        }
        ;
    });
    return {
        cities: Object.keys(splittedOffers).sort(),
        offers: splittedOffers
    };
};
exports.getNearbyCoordList = function (state) {
    return exports.getNearbyList(state).map(function (it) { return it.coord; });
};
