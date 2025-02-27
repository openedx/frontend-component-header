import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Responsive from 'react-responsive';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform';
import MobileHeader from './MobileHeader';
import HeaderBody from './HeaderBody';
ensureConfig(['STUDIO_BASE_URL', 'SITE_NAME', 'LOGOUT_URL', 'LOGIN_URL', 'LOGO_URL'], 'Studio Header component');
var StudioHeader = function StudioHeader(_ref) {
  var number = _ref.number,
    org = _ref.org,
    title = _ref.title,
    containerProps = _ref.containerProps,
    isHiddenMainMenu = _ref.isHiddenMainMenu,
    mainMenuDropdowns = _ref.mainMenuDropdowns,
    outlineLink = _ref.outlineLink,
    searchButtonAction = _ref.searchButtonAction,
    isNewHomePage = _ref.isNewHomePage;
  var _useContext = useContext(AppContext),
    authenticatedUser = _useContext.authenticatedUser,
    config = _useContext.config;
  var props = {
    logo: config.LOGO_URL,
    logoAltText: "Studio ".concat(config.SITE_NAME),
    number: number,
    org: org,
    title: title,
    containerProps: containerProps,
    username: authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.username,
    isAdmin: authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.administrator,
    authenticatedUserAvatar: authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.avatar,
    studioBaseUrl: isNewHomePage ? '/home' : config.STUDIO_BASE_URL,
    logoutUrl: config.LOGOUT_URL,
    isHiddenMainMenu: isHiddenMainMenu,
    mainMenuDropdowns: mainMenuDropdowns,
    outlineLink: outlineLink,
    searchButtonAction: searchButtonAction
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "studio-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-skip sr-only sr-only-focusable",
    href: "#main"
  }, "Skip to content"), /*#__PURE__*/React.createElement(Responsive, {
    maxWidth: 841
  }, /*#__PURE__*/React.createElement(MobileHeader, props)), /*#__PURE__*/React.createElement(Responsive, {
    minWidth: 842
  }, /*#__PURE__*/React.createElement(HeaderBody, props)));
};
StudioHeader.propTypes = {
  number: PropTypes.string,
  org: PropTypes.string,
  title: PropTypes.string.isRequired,
  containerProps: HeaderBody.propTypes.containerProps,
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
  isNewHomePage: PropTypes.bool.isRequired
};
StudioHeader.defaultProps = {
  number: '',
  org: '',
  containerProps: {},
  isHiddenMainMenu: false,
  mainMenuDropdowns: [],
  outlineLink: null,
  searchButtonAction: null
};
export default StudioHeader;
//# sourceMappingURL=StudioHeader.js.map