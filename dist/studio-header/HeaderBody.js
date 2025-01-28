var _excluded = ["className"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import { ActionRow, Button, Container, Icon, IconButton, Nav, Row } from '@openedx/paragon';
import { Close, MenuIcon, Search } from '@openedx/paragon/icons';
import CourseLockUp from './CourseLockUp';
import UserMenu from './UserMenu';
import BrandNav from './BrandNav';
import NavDropdownMenu from './NavDropdownMenu';
import messages from './messages';
var HeaderBody = function HeaderBody(_ref) {
  var logo = _ref.logo,
    logoAltText = _ref.logoAltText,
    number = _ref.number,
    org = _ref.org,
    title = _ref.title,
    username = _ref.username,
    isAdmin = _ref.isAdmin,
    studioBaseUrl = _ref.studioBaseUrl,
    logoutUrl = _ref.logoutUrl,
    authenticatedUserAvatar = _ref.authenticatedUserAvatar,
    isMobile = _ref.isMobile,
    setModalPopupTarget = _ref.setModalPopupTarget,
    toggleModalPopup = _ref.toggleModalPopup,
    isModalPopupOpen = _ref.isModalPopupOpen,
    isHiddenMainMenu = _ref.isHiddenMainMenu,
    mainMenuDropdowns = _ref.mainMenuDropdowns,
    outlineLink = _ref.outlineLink,
    searchButtonAction = _ref.searchButtonAction,
    containerProps = _ref.containerProps;
  var intl = useIntl();
  var renderBrandNav = /*#__PURE__*/React.createElement(BrandNav, {
    studioBaseUrl: studioBaseUrl,
    logo: logo,
    logoAltText: logoAltText
  });
  var _ref2 = containerProps || {},
    containerClassName = _ref2.className,
    restContainerProps = _objectWithoutProperties(_ref2, _excluded);
  return /*#__PURE__*/React.createElement(Container, _extends({
    size: "xl",
    className: classNames('px-2.5', containerClassName)
  }, restContainerProps), /*#__PURE__*/React.createElement(ActionRow, {
    as: "header"
  }, isHiddenMainMenu ? /*#__PURE__*/React.createElement(Row, {
    className: "flex-nowrap ml-4"
  }, renderBrandNav) : /*#__PURE__*/React.createElement(React.Fragment, null, isMobile ? /*#__PURE__*/React.createElement(Button, {
    ref: setModalPopupTarget,
    className: "d-inline-flex align-items-center",
    variant: "tertiary",
    onClick: toggleModalPopup,
    iconBefore: isModalPopupOpen ? Close : MenuIcon,
    "data-testid": "mobile-menu-button"
  }, "Menu") : /*#__PURE__*/React.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React.createElement(Row, {
    className: "m-0 flex-nowrap"
  }, renderBrandNav, /*#__PURE__*/React.createElement(CourseLockUp, {
    outlineLink: outlineLink,
    number: number,
    org: org,
    title: title
  }))), isMobile ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ActionRow.Spacer, null), renderBrandNav) : /*#__PURE__*/React.createElement(Nav, {
    "data-testid": "desktop-menu",
    className: "ml-2"
  }, mainMenuDropdowns.map(function (dropdown) {
    var id = dropdown.id,
      buttonTitle = dropdown.buttonTitle,
      items = dropdown.items;
    return /*#__PURE__*/React.createElement(NavDropdownMenu, {
      key: id,
      id: id,
      buttonTitle: buttonTitle,
      items: items
    });
  }))), /*#__PURE__*/React.createElement(ActionRow.Spacer, null), searchButtonAction && /*#__PURE__*/React.createElement(Nav, null, /*#__PURE__*/React.createElement(IconButton, {
    src: Search,
    iconAs: Icon,
    onClick: searchButtonAction,
    "aria-label": intl.formatMessage(messages['header.label.search.nav']),
    alt: intl.formatMessage(messages['header.label.search.nav'])
  })), /*#__PURE__*/React.createElement(Nav, null, /*#__PURE__*/React.createElement(UserMenu, {
    username: username,
    studioBaseUrl: studioBaseUrl,
    logoutUrl: logoutUrl,
    authenticatedUserAvatar: authenticatedUserAvatar,
    isAdmin: isAdmin
  }))));
};
HeaderBody.propTypes = {
  studioBaseUrl: PropTypes.string.isRequired,
  logoutUrl: PropTypes.string.isRequired,
  setModalPopupTarget: PropTypes.func,
  toggleModalPopup: PropTypes.func,
  isModalPopupOpen: PropTypes.bool,
  number: PropTypes.string,
  org: PropTypes.string,
  title: PropTypes.string,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  authenticatedUserAvatar: PropTypes.string,
  username: PropTypes.string,
  isAdmin: PropTypes.bool,
  isMobile: PropTypes.bool,
  isHiddenMainMenu: PropTypes.bool,
  mainMenuDropdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    buttonTitle: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.node
    }))
  })),
  outlineLink: PropTypes.string,
  searchButtonAction: PropTypes.func,
  containerProps: PropTypes.shape(Container.propTypes)
};
HeaderBody.defaultProps = {
  setModalPopupTarget: null,
  toggleModalPopup: null,
  isModalPopupOpen: false,
  logo: null,
  logoAltText: null,
  number: '',
  org: '',
  title: '',
  authenticatedUserAvatar: null,
  username: null,
  isAdmin: false,
  isMobile: false,
  isHiddenMainMenu: false,
  mainMenuDropdowns: [],
  outlineLink: null,
  searchButtonAction: null,
  containerProps: {}
};
export default HeaderBody;
//# sourceMappingURL=HeaderBody.js.map