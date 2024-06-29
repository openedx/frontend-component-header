import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Avatar } from '@openedx/paragon';
import NavDropdownMenu from './NavDropdownMenu';
import getUserMenuItems from './utils';
var UserMenu = function UserMenu(_ref) {
  var username = _ref.username,
    studioBaseUrl = _ref.studioBaseUrl,
    logoutUrl = _ref.logoutUrl,
    authenticatedUserAvatar = _ref.authenticatedUserAvatar,
    isMobile = _ref.isMobile,
    isAdmin = _ref.isAdmin,
    intl = _ref.intl;
  var avatar = authenticatedUserAvatar ? /*#__PURE__*/React.createElement("img", {
    className: "d-block w-100 h-100",
    src: authenticatedUserAvatar,
    alt: username,
    "data-testid": "avatar-image"
  }) : /*#__PURE__*/React.createElement(Avatar, {
    size: "sm",
    className: "mr-2",
    alt: username,
    "data-testid": "avatar-icon"
  });
  var title = isMobile ? avatar : /*#__PURE__*/React.createElement(React.Fragment, null, avatar, username);
  return /*#__PURE__*/React.createElement(NavDropdownMenu, {
    buttonTitle: title,
    id: "user-dropdown-menu",
    items: getUserMenuItems({
      studioBaseUrl: studioBaseUrl,
      logoutUrl: logoutUrl,
      intl: intl,
      isAdmin: isAdmin
    })
  });
};
UserMenu.propTypes = {
  username: PropTypes.string,
  studioBaseUrl: PropTypes.string.isRequired,
  logoutUrl: PropTypes.string.isRequired,
  authenticatedUserAvatar: PropTypes.string,
  isMobile: PropTypes.bool,
  isAdmin: PropTypes.bool,
  // injected
  intl: intlShape.isRequired
};
UserMenu.defaultProps = {
  isMobile: false,
  isAdmin: false,
  authenticatedUserAvatar: null,
  username: null
};
export default injectIntl(UserMenu);
//# sourceMappingURL=UserMenu.js.map