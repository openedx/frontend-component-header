function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';
import LearningUserMenuSlot from '../plugin-slots/LearningUserMenuSlot';
import messages from './messages';
var AuthenticatedUserDropdown = function AuthenticatedUserDropdown(_ref) {
  var intl = _ref.intl,
    username = _ref.username;
  var dropdownItems = [{
    message: intl.formatMessage(messages.dashboard),
    href: "".concat(getConfig().LMS_BASE_URL, "/dashboard")
  }, {
    message: intl.formatMessage(messages.profile),
    href: "".concat(getConfig().ACCOUNT_PROFILE_URL, "/u/").concat(username)
  }, {
    message: intl.formatMessage(messages.account),
    href: getConfig().ACCOUNT_SETTINGS_URL
  }].concat(_toConsumableArray(getConfig().ORDER_HISTORY_URL ? [{
    message: intl.formatMessage(messages.orderHistory),
    href: getConfig().ORDER_HISTORY_URL
  }] : []), [{
    message: intl.formatMessage(messages.signOut),
    href: getConfig().LOGOUT_URL
  }]);
  return /*#__PURE__*/React.createElement(Dropdown, {
    className: "user-dropdown ml-3"
  }, /*#__PURE__*/React.createElement(Dropdown.Toggle, {
    variant: "outline-primary"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faUserCircle,
    className: "d-md-none",
    size: "lg"
  }), /*#__PURE__*/React.createElement("span", {
    "data-hj-suppress": true,
    className: "d-none d-md-inline"
  }, username)), /*#__PURE__*/React.createElement(Dropdown.Menu, {
    className: "dropdown-menu-right"
  }, /*#__PURE__*/React.createElement(LearningUserMenuSlot, {
    items: dropdownItems
  })));
};
AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired
};
export default injectIntl(AuthenticatedUserDropdown);
//# sourceMappingURL=AuthenticatedUserDropdown.js.map