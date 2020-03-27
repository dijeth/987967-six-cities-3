"use strict";
var _a;
exports.__esModule = true;
var React = require("react");
var const_1 = require("../../const/const");
var util_js_1 = require("../../util.js");
var react_router_dom_1 = require("react-router-dom");
var PlaceCardProperties = (_a = {},
    _a[const_1.PlaceCardType.DEFAULT] = {
        articleClass: "cities__place-card",
        imageWrapperClass: "cities__image-wrapper",
        cardInfoClass: "",
        imageWidth: 260,
        imageHeight: 200
    },
    _a[const_1.PlaceCardType.FAVORITE] = {
        articleClass: "favorites__card",
        imageWrapperClass: "favorites__image-wrapper",
        cardInfoClass: "favorites__card-info",
        imageWidth: 150,
        imageHeight: 110
    },
    _a[const_1.PlaceCardType.NEARBY] = {
        articleClass: "near-places__card",
        imageWrapperClass: "near-places__image-wrapper",
        cardInfoClass: "",
        imageWidth: 260,
        imageHeight: 200
    },
    _a);
var PlaceCard = function (_a) {
    var offer = _a.offer, onHover = _a.onHover, isAuth = _a.isAuth, type = _a.type;
    var title = offer.title, offerType = offer.type, pictures = offer.pictures, cost = offer.cost, rating = offer.rating, isPremium = offer.isPremium, isFavorite = offer.isFavorite, id = offer.id;
    var ratingPercent = util_js_1.ratingToPercent(rating);
    var picture = pictures[0];
    var link = const_1.AppRoute.getOffer(id);
    var handleMouseEnter = function () {
        onHover(offer);
    };
    var handleMouseLeave = function () {
        onHover(null);
    };
    var articleClass = PlaceCardProperties[type].articleClass;
    var imageWrapperClass = PlaceCardProperties[type].imageWrapperClass;
    var cardInfoClass = PlaceCardProperties[type].cardInfoClass;
    var imageWidth = PlaceCardProperties[type].imageWidth;
    var imageHeight = PlaceCardProperties[type].imageHeight;
    var favoriteButtonBlock = (React.createElement("button", { className: "place-card__bookmark-button " + (isFavorite ? "place-card__bookmark-button--active" : "") + " button", type: "button" },
        React.createElement("svg", { className: "place-card__bookmark-icon", width: "18", height: "19" },
            React.createElement("use", { xlinkHref: "#icon-bookmark" })),
        React.createElement("span", { className: "visually-hidden" }, (isFavorite ? "From" : "To") + " bookmarks")));
    var linkToLogin = (React.createElement(react_router_dom_1.Link, { to: const_1.AppRoute.getLogin(), className: "place-card__bookmark-button button" },
        React.createElement("svg", { className: "place-card__bookmark-icon", width: "18", height: "19" },
            React.createElement("use", { xlinkHref: "#icon-bookmark" })),
        React.createElement("span", { className: "visually-hidden" }, "To bookmarks")));
    return (React.createElement("article", { className: articleClass + " place-card", onMouseEnter: onHover ? handleMouseEnter : null, onMouseLeave: onHover ? handleMouseLeave : null },
        isPremium && React.createElement("div", { className: "place-card__mark" },
            React.createElement("span", null, "Premium")),
        React.createElement("div", { className: imageWrapperClass + " place-card__image-wrapper" },
            React.createElement("a", { href: "#" },
                React.createElement("img", { className: "place-card__image", src: picture, width: imageWidth, height: imageHeight, alt: "Place image" }))),
        React.createElement("div", { className: cardInfoClass + " place-card__info" },
            React.createElement("div", { className: "place-card__price-wrapper" },
                React.createElement("div", { className: "place-card__price" },
                    React.createElement("b", { className: "place-card__price-value" },
                        "\u20AC",
                        cost),
                    React.createElement("span", { className: "place-card__price-text" }, "/\u00A0night")),
                isAuth ? favoriteButtonBlock : linkToLogin),
            React.createElement("div", { className: "place-card__rating rating" },
                React.createElement("div", { className: "place-card__stars rating__stars" },
                    React.createElement("span", { style: { width: ratingPercent + "%" } }),
                    React.createElement("span", { className: "visually-hidden" }, "Rating"))),
            React.createElement("h2", { className: "place-card__name" },
                React.createElement(react_router_dom_1.Link, { to: link }, title)),
            React.createElement("p", { className: "place-card__type" }, offerType))));
};
exports["default"] = React.memo(PlaceCard);
