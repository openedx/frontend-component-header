function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["tag", "className"],
  _excluded2 = ["tag", "className"];
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
var MenuTrigger = function MenuTrigger(_ref) {
  var tag = _ref.tag,
    className = _ref.className,
    attributes = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(tag, _objectSpread({
    className: "menu-trigger ".concat(className)
  }, attributes));
};
MenuTrigger.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string
};
MenuTrigger.defaultProps = {
  tag: 'div',
  className: null
};
var MenuTriggerComp = /*#__PURE__*/React.createElement(MenuTrigger, null);
var MenuTriggerType = MenuTriggerComp.type;
var MenuContent = function MenuContent(_ref2) {
  var tag = _ref2.tag,
    className = _ref2.className,
    attributes = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/React.createElement(tag, _objectSpread({
    className: ['menu-content', className].join(' ')
  }, attributes));
};
MenuContent.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string
};
MenuContent.defaultProps = {
  tag: 'div',
  className: null
};
var menuPropTypes = {
  tag: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  closeOnDocumentClick: PropTypes.bool,
  respondToPointerEvents: PropTypes.bool,
  className: PropTypes.string,
  transitionTimeout: PropTypes.number,
  transitionClassName: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};
var Menu = /*#__PURE__*/function (_React$Component) {
  function Menu(props) {
    var _this;
    _classCallCheck(this, Menu);
    _this = _callSuper(this, Menu, [props]);
    _this.menu = /*#__PURE__*/React.createRef();
    _this.state = {
      expanded: false
    };
    _this.onTriggerClick = _this.onTriggerClick.bind(_this);
    _this.onCloseClick = _this.onCloseClick.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onDocumentClick = _this.onDocumentClick.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);
    return _this;
  }

  // Lifecycle Events
  _inherits(Menu, _React$Component);
  return _createClass(Menu, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('touchend', this.onDocumentClick, true);
      document.removeEventListener('click', this.onDocumentClick, true);

      // Call onClose callback when unmounting and open
      if (this.state.expanded && this.props.onClose) {
        this.props.onClose();
      }
    }

    // Event handlers
  }, {
    key: "onDocumentClick",
    value: function onDocumentClick(e) {
      if (!this.props.closeOnDocumentClick) {
        return;
      }
      var clickIsInMenu = this.menu.current === e.target || this.menu.current.contains(e.target);
      if (clickIsInMenu) {
        return;
      }
      this.close();
    }
  }, {
    key: "onTriggerClick",
    value: function onTriggerClick(e) {
      // Let the browser follow the link of the trigger if the menu
      // is already expanded and the trigger has an href attribute
      if (this.state.expanded && e.target.getAttribute('href')) {
        return;
      }
      e.preventDefault();
      this.toggle();
    }
  }, {
    key: "onCloseClick",
    value: function onCloseClick() {
      this.getFocusableElements()[0].focus();
      this.close();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (!this.state.expanded) {
        return;
      }
      switch (e.key) {
        case 'Escape':
          {
            e.preventDefault();
            e.stopPropagation();
            this.getFocusableElements()[0].focus();
            this.close();
            break;
          }
        case 'Enter':
          {
            // Using focusable elements instead of a ref to the trigger
            // because Hyperlink and Button can handle refs as functional components
            if (document.activeElement === this.getFocusableElements()[0]) {
              e.preventDefault();
              this.toggle();
            }
            break;
          }
        case 'Tab':
          {
            e.preventDefault();
            if (e.shiftKey) {
              this.focusPrevious();
            } else {
              this.focusNext();
            }
            break;
          }
        case 'ArrowDown':
          {
            e.preventDefault();
            this.focusNext();
            break;
          }
        case 'ArrowUp':
          {
            e.preventDefault();
            this.focusPrevious();
            break;
          }
        default:
      }
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter() {
      if (!this.props.respondToPointerEvents) {
        return;
      }
      this.open();
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave() {
      if (!this.props.respondToPointerEvents) {
        return;
      }
      this.close();
    }

    // Internal functions
  }, {
    key: "getFocusableElements",
    value: function getFocusableElements() {
      return this.menu.current.querySelectorAll('button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])');
    }
  }, {
    key: "getAttributesFromProps",
    value: function getAttributesFromProps() {
      var _this2 = this;
      // Any extra props are attributes for the menu
      var attributes = {};
      Object.keys(this.props).filter(function (property) {
        return menuPropTypes[property] === undefined;
      }).forEach(function (property) {
        attributes[property] = _this2.props[property];
      });
      return attributes;
    }
  }, {
    key: "focusNext",
    value: function focusNext() {
      var focusableElements = Array.from(this.getFocusableElements());
      var activeIndex = focusableElements.indexOf(document.activeElement);
      var nextIndex = (activeIndex + 1) % focusableElements.length;
      focusableElements[nextIndex].focus();
    }
  }, {
    key: "focusPrevious",
    value: function focusPrevious() {
      var focusableElements = Array.from(this.getFocusableElements());
      var activeIndex = focusableElements.indexOf(document.activeElement);
      var previousIndex = (activeIndex || focusableElements.length) - 1;
      focusableElements[previousIndex].focus();
    }
  }, {
    key: "open",
    value: function open() {
      if (this.props.onOpen) {
        this.props.onOpen();
      }
      this.setState({
        expanded: true
      });
      // Listen to touchend and click events to ensure the menu
      // can be closed on mobile, pointer, and mixed input devices
      document.addEventListener('touchend', this.onDocumentClick, true);
      document.addEventListener('click', this.onDocumentClick, true);
    }
  }, {
    key: "close",
    value: function close() {
      if (this.props.onClose) {
        this.props.onClose();
      }
      this.setState({
        expanded: false
      });
      document.removeEventListener('touchend', this.onDocumentClick, true);
      document.removeEventListener('click', this.onDocumentClick, true);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.state.expanded) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: "renderTrigger",
    value: function renderTrigger(node) {
      return /*#__PURE__*/React.cloneElement(node, {
        onClick: this.onTriggerClick,
        'aria-haspopup': 'menu',
        'aria-expanded': this.state.expanded
      });
    }
  }, {
    key: "renderMenuContent",
    value: function renderMenuContent(node) {
      return /*#__PURE__*/React.createElement(CSSTransition, {
        "in": this.state.expanded,
        timeout: this.props.transitionTimeout,
        classNames: this.props.transitionClassName,
        unmountOnExit: true
      }, node);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var className = this.props.className;
      var wrappedChildren = React.Children.map(this.props.children, function (child) {
        if (child.type === MenuTriggerType) {
          return _this3.renderTrigger(child);
        }
        return _this3.renderMenuContent(child);
      });
      var rootClassName = this.state.expanded ? 'menu expanded' : 'menu';
      return /*#__PURE__*/React.createElement(this.props.tag, _objectSpread({
        className: "".concat(rootClassName, " ").concat(className),
        ref: this.menu,
        onKeyDown: this.onKeyDown,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave
      }, this.getAttributesFromProps()), wrappedChildren);
    }
  }]);
}(React.Component);
Menu.propTypes = menuPropTypes;
Menu.defaultProps = {
  tag: 'div',
  className: null,
  onClose: null,
  onOpen: null,
  respondToPointerEvents: false,
  closeOnDocumentClick: true,
  transitionTimeout: 250,
  transitionClassName: 'menu-content'
};
export { Menu, MenuTrigger, MenuContent };
//# sourceMappingURL=Menu.js.map