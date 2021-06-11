import React, { useContext } from 'react';
import Responsive from 'react-responsive';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  APP_CONFIG_INITIALIZED,
  ensureConfig,
  mergeConfig,
  getConfig,
  subscribe,
} from '@edx/frontend-platform';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

import messages from './Header.messages';

ensureConfig([
  'LMS_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
  'SITE_NAME',
  'LOGO_URL',
  'ORDER_HISTORY_URL',
], 'Header component');

subscribe(APP_CONFIG_INITIALIZED, () => {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER,
  }, 'Header additional config');
});

function Header({ intl }) {
  const { authenticatedUser, config } = useContext(AppContext);

  const mainMenu = [
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(messages['header.links.courses']),
    },
  ];

  const userMenu = authenticatedUser === null ? [] : [
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(messages['header.user.menu.dashboard']),
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/u/${authenticatedUser.username}`,
      content: intl.formatMessage(messages['header.user.menu.profile']),
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/account/settings`,
      content: intl.formatMessage(messages['header.user.menu.account.settings']),
    },
    {
      type: 'item',
      href: config.ORDER_HISTORY_URL,
      content: intl.formatMessage(messages['header.user.menu.order.history']),
    },
    {
      type: 'item',
      href: config.LOGOUT_URL,
      content: intl.formatMessage(messages['header.user.menu.logout']),
    },
  ];

  const loggedOutItems = [
    {
      type: 'item',
      href: config.LOGIN_URL,
      content: intl.formatMessage(messages['header.user.menu.login']),
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/register`,
      content: intl.formatMessage(messages['header.user.menu.register']),
    },
  ];

  const props = {
    logo: config.LOGO_URL,
    logoAltText: config.SITE_NAME,
    logoDestination: `${config.LMS_BASE_URL}/dashboard`,
    loggedIn: authenticatedUser !== null,
    username: authenticatedUser !== null ? authenticatedUser.username : null,
    avatar: authenticatedUser !== null ? authenticatedUser.avatar : null,
    mainMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : mainMenu,
    userMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : userMenu,
    loggedOutItems: getConfig().AUTHN_MINIMAL_HEADER ? [] : loggedOutItems,
  };

  return (
    <>
      <Responsive maxWidth={768}>
        <MobileHeader {...props} />
      </Responsive>
      <Responsive minWidth={769}>
        <DesktopHeader {...props} />
      </Responsive>
    </>
  );
}

Header.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Header);
