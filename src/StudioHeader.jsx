import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  APP_CONFIG_INITIALIZED,
  ensureConfig,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';

import DesktopHeader from './DesktopHeader';

import messages from './Header.messages';

ensureConfig([
  'STUDIO_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
  'SITE_NAME',
  'LOGO_URL',
  'ORDER_HISTORY_URL',
], 'StudioHeader component');

subscribe(APP_CONFIG_INITIALIZED, () => {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER,
  }, 'StudioHeader additional config');
});

function StudioHeader({ intl, mainMenu, appMenu }) {
  const { authenticatedUser, config } = useContext(AppContext);

  const userMenu = authenticatedUser === null ? [] : [
    {
      type: 'item',
      href: `${config.STUDIO_BASE_URL}`,
      content: intl.formatMessage(messages['header.user.menu.studio.home']),
    },
    {
      type: 'item',
      href: `${config.STUDIO_BASE_URL}/maintenance`,
      content: intl.formatMessage(messages['header.user.menu.studio.maintenance']),
    },
    {
      type: 'item',
      href: config.LOGOUT_URL,
      content: intl.formatMessage(messages['header.user.menu.logout']),
    },
  ];

  const props = {
    logo: config.LOGO_URL,
    logoAltText: config.SITE_NAME,
    logoDestination: config.STUDIO_BASE_URL,
    loggedIn: authenticatedUser !== null,
    username: authenticatedUser !== null ? authenticatedUser.username : null,
    avatar: authenticatedUser !== null ? authenticatedUser.avatar : null,
    mainMenu,
    userMenu,
    appMenu,
    loggedOutItems: [],
  };

  return <DesktopHeader {...props} />;
}

StudioHeader.propTypes = {
  intl: intlShape.isRequired,
  appMenu: PropTypes.shape(
    {
      content: PropTypes.string,
      href: PropTypes.string,
      menuItems: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string,
          href: PropTypes.string,
          content: PropTypes.string,
        }),
      ),
    },
  ),
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape(
      {
        type: PropTypes.string,
        href: PropTypes.string,
        content: PropTypes.string,
      },
    ),
  ),
};

StudioHeader.defaultProps = {
  appMenu: null,
  mainMenu: [],
};

export default injectIntl(StudioHeader);
