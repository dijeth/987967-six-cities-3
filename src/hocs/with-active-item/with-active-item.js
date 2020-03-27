"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var util_js_1 = require("../../util.js");
var NO_ACTIVE_INDEX = -1;
var getChildIndex = function (targetElement, parentElement) {
    var childrenElements = parentElement.children;
    var index = Array.from(childrenElements).findIndex(function (it) { return it.contains(targetElement); });
    return index === -1 ? NO_ACTIVE_INDEX : index;
};
var withActiveItem = function (ListComponent, clickTargetSelector) {
    var WithActiveItem = /** @class */ (function (_super) {
        __extends(WithActiveItem, _super);
        function WithActiveItem(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                activeIndex: props.activeItem ? props.items.findIndex(function (it) { return util_js_1.compareObjects(it, props.activeItem); }) : NO_ACTIVE_INDEX
            };
            _this._handleClick = _this._handleClick.bind(_this);
            return _this;
        }
        WithActiveItem.prototype._handleClick = function (evt) {
            var parentElement = evt.currentTarget;
            var element = evt.target;
            var activeIndex = getChildIndex(element, parentElement);
            if (activeIndex === NO_ACTIVE_INDEX) {
                return;
            }
            var activeItem = parentElement.children[activeIndex];
            if (clickTargetSelector && !activeItem.querySelector(clickTargetSelector).contains(element)) {
                return;
            }
            evt.preventDefault();
            this.setState({ activeIndex: activeIndex });
            var handler = this.props.onActiveItemChange;
            if (handler !== null) {
                handler(this.props.items[activeIndex]);
            }
        };
        WithActiveItem.prototype.render = function () {
            var items = this.props.items;
            var activeItem = this.state.activeIndex !== NO_ACTIVE_INDEX ? items[this.state.activeIndex] : null;
            return React.createElement(ListComponent, __assign({}, this.props, { activeItem: activeItem, onListClick: this._handleClick }));
        };
        return WithActiveItem;
    }(React.PureComponent));
    return WithActiveItem;
};
exports["default"] = withActiveItem;
