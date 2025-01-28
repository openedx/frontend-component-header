function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

// Local Components
import { Menu, MenuTrigger, MenuContent } from '../Menu';
import Avatar from '../Avatar';
import LogoSlot from '../plugin-slots/LogoSlot';
import MobileLoggedOutItemsSlot from '../plugin-slots/MobileLoggedOutItemsSlot';
import { mobileHeaderLoggedOutItemsDataShape } from './MobileLoggedOutItems';
import MobileMainMenuSlot from '../plugin-slots/MobileMainMenuSlot';
import { mobileHeaderMainMenuDataShape } from './MobileHeaderMainMenu';
import MobileUserMenuSlot from '../plugin-slots/MobileUserMenuSlot';
import { mobileHeaderUserMenuDataShape } from './MobileHeaderUserMenu';

// i18n
import messages from '../Header.messages';

// Assets
import { MenuIcon } from '../Icons';
var MobileHeader = /*#__PURE__*/function (_React$Component) {
  function MobileHeader(props) {
    _classCallCheck(this, MobileHeader);
    // eslint-disable-line no-useless-constructor
    return _callSuper(this, MobileHeader, [props]);
  }
  _inherits(MobileHeader, _React$Component);
  return _createClass(MobileHeader, [{
    key: "renderMainMenu",
    value: function renderMainMenu() {
      var _this$props = this.props,
        mainMenu = _this$props.mainMenu,
        secondaryMenu = _this$props.secondaryMenu;
      return /*#__PURE__*/React.createElement(MobileMainMenuSlot, {
        menu: [].concat(_toConsumableArray(mainMenu), _toConsumableArray(secondaryMenu))
      });
    }
  }, {
    key: "renderUserMenuItems",
    value: function renderUserMenuItems() {
      var userMenu = this.props.userMenu;
      return /*#__PURE__*/React.createElement(MobileUserMenuSlot, {
        menu: userMenu
      });
    }
  }, {
    key: "renderLoggedOutItems",
    value: function renderLoggedOutItems() {
      var loggedOutItems = this.props.loggedOutItems;
      return /*#__PURE__*/React.createElement(MobileLoggedOutItemsSlot, {
        items: loggedOutItems
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        logo = _this$props2.logo,
        logoAltText = _this$props2.logoAltText,
        logoDestination = _this$props2.logoDestination,
        loggedIn = _this$props2.loggedIn,
        avatar = _this$props2.avatar,
        username = _this$props2.username,
        stickyOnMobile = _this$props2.stickyOnMobile,
        intl = _this$props2.intl,
        mainMenu = _this$props2.mainMenu,
        userMenu = _this$props2.userMenu,
        loggedOutItems = _this$props2.loggedOutItems;
      var logoProps = {
        src: logo,
        alt: logoAltText,
        href: logoDestination
      };
      var stickyClassName = stickyOnMobile ? 'sticky-top' : '';
      var logoClasses = getConfig().AUTHN_MINIMAL_HEADER ? 'justify-content-left pl-3' : 'justify-content-center';
      return /*#__PURE__*/React.createElement("header", {
        "aria-label": intl.formatMessage(messages['header.label.main.header']),
        className: "site-header-mobile d-flex justify-content-between align-items-center shadow ".concat(stickyClassName)
      }, /*#__PURE__*/React.createElement("a", {
        className: "nav-skip sr-only sr-only-focusable",
        href: "#main"
      }, intl.formatMessage(messages['header.label.skip.nav'])), mainMenu.length > 0 ? /*#__PURE__*/React.createElement("div", {
        className: "w-100 d-flex justify-content-start"
      }, /*#__PURE__*/React.createElement(Menu, {
        className: "position-static"
      }, /*#__PURE__*/React.createElement(MenuTrigger, {
        tag: "button",
        className: "icon-button",
        "aria-label": intl.formatMessage(messages['header.label.main.menu']),
        title: intl.formatMessage(messages['header.label.main.menu'])
      }, /*#__PURE__*/React.createElement(MenuIcon, {
        role: "img",
        "aria-hidden": true,
        focusable: "false",
        style: {
          width: '1.5rem',
          height: '1.5rem'
        }
      })), /*#__PURE__*/React.createElement(MenuContent, {
        tag: "nav",
        "aria-label": intl.formatMessage(messages['header.label.main.nav']),
        className: "nav flex-column pin-left pin-right border-top shadow py-2"
      }, this.renderMainMenu()))) : null, /*#__PURE__*/React.createElement("div", {
        className: "w-100 d-flex ".concat(logoClasses)
      }, /*#__PURE__*/React.createElement(LogoSlot, _extends({}, logoProps, {
        itemType: "http://schema.org/Organization"
      }))), userMenu.length > 0 || loggedOutItems.length > 0 ? /*#__PURE__*/React.createElement("div", {
        className: "w-100 d-flex justify-content-end align-items-center"
      }, /*#__PURE__*/React.createElement(Menu, {
        tag: "nav",
        "aria-label": intl.formatMessage(messages['header.label.secondary.nav']),
        className: "position-static"
      }, /*#__PURE__*/React.createElement(MenuTrigger, {
        tag: "button",
        className: "icon-button",
        "aria-label": intl.formatMessage(messages['header.label.account.menu']),
        title: intl.formatMessage(messages['header.label.account.menu'])
      }, /*#__PURE__*/React.createElement(Avatar, {
        size: "1.5rem",
        src: avatar,
        alt: username
      })), /*#__PURE__*/React.createElement(MenuContent, {
        tag: "ul",
        className: "nav flex-column pin-left pin-right border-top shadow py-2"
      }, loggedIn ? this.renderUserMenuItems() : this.renderLoggedOutItems()))) : null);
    }
  }]);
}(React.Component);
export var mobileHeaderDataShape = {
  mainMenu: mobileHeaderMainMenuDataShape,
  secondaryMenu: mobileHeaderMainMenuDataShape,
  userMenu: mobileHeaderUserMenuDataShape,
  loggedOutItems: mobileHeaderLoggedOutItemsDataShape,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
  stickyOnMobile: PropTypes.bool
};
MobileHeader.propTypes = {
  mainMenu: mobileHeaderDataShape.mainMenu,
  secondaryMenu: mobileHeaderDataShape.secondaryMenu,
  userMenu: mobileHeaderDataShape.userMenu,
  loggedOutItems: mobileHeaderDataShape.loggedOutItems,
  logo: mobileHeaderDataShape.logo,
  logoAltText: mobileHeaderDataShape.logoAltText,
  logoDestination: mobileHeaderDataShape.logoDestination,
  avatar: mobileHeaderDataShape.avatar,
  username: mobileHeaderDataShape.username,
  loggedIn: mobileHeaderDataShape.loggedIn,
  stickyOnMobile: mobileHeaderDataShape.stickyOnMobile,
  // i18n
  intl: intlShape.isRequired
};
MobileHeader.defaultProps = {
  mainMenu: [],
  secondaryMenu: [],
  userMenu: [],
  loggedOutItems: [],
  logo: null,
  logoAltText: null,
  logoDestination: null,
  avatar: null,
  username: null,
  loggedIn: false,
  stickyOnMobile: true
};
export default injectIntl(MobileHeader);
//# sourceMappingURL=MobileHeader.js.map