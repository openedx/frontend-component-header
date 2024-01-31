import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import {
  Avatar,
} from '@openedx/paragon';
import NavDropdownMenu from './NavDropdownMenu';
import getUserMenuItems from './utils';

const UserMenu = ({
  name,
  username,
  studioBaseUrl,
  logoutUrl,
  authenticatedUserAvatar,
  isMobile,
  isAdmin,
  // injected
  intl,
}) => {
  const hideUsername = getConfig().HIDE_USERNAME_FROM_HEADER;
  const avatarAlt = hideUsername ? name : username;
  const avatar = authenticatedUserAvatar ? (
    <img
      className="d-block w-100 h-100"
      src={authenticatedUserAvatar}
      alt={avatarAlt}
      data-testid="avatar-image"
    />
  ) : (
    <Avatar
      size="sm"
      className="mr-2"
      alt={avatarAlt}
      data-testid="avatar-icon"
    />
  );
  const title = (isMobile || hideUsername) ? avatar : <>{avatar}{username}</>;

  return (
    <NavDropdownMenu
      buttonTitle={title}
      id="user-dropdown-menu"
      items={getUserMenuItems({
        studioBaseUrl,
        logoutUrl,
        intl,
        isAdmin,
      })}
    />
  );
};

UserMenu.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  studioBaseUrl: PropTypes.string.isRequired,
  logoutUrl: PropTypes.string.isRequired,
  authenticatedUserAvatar: PropTypes.string,
  isMobile: PropTypes.bool,
  isAdmin: PropTypes.bool,
  // injected
  intl: intlShape.isRequired,
};

UserMenu.defaultProps = {
  isMobile: false,
  isAdmin: false,
  authenticatedUserAvatar: null,
  name: null,
  username: null,
};

export default injectIntl(UserMenu);
