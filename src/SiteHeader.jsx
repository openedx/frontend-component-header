import React, { useContext } from 'react';
import Responsive from 'react-responsive';
import { injectIntl, intlShape } from '@edx/frontend-i18n';
import { App, AppContext } from '@edx/frontend-base';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

import LogoSVG from './logo.svg';

import messages from './SiteHeader.messages';

App.requireConfig([
  'LMS_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
  'SITE_NAME',
], 'Header component');

function SiteHeader({ intl }) {
  const { authenticatedUser, config } = useContext(AppContext);

  const mainMenu = [
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(messages['header.links.courses']),
    },
  ];

  const userMenu = [
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
    logo: LogoSVG,
    logoAltText: config.SITE_NAME,
    siteName: config.SITE_NAME,
    logoDestination: `${config.LMS_BASE_URL}/dashboard`,
    loggedIn: !!authenticatedUser.username,
    username: authenticatedUser.username,
    avatar: authenticatedUser.avatar,
    mainMenu,
    userMenu,
    loggedOutItems,
  };

  return (
    <React.Fragment>
      <Responsive maxWidth={768}>
        <MobileHeader {...props} />
      </Responsive>
      <Responsive minWidth={769}>
        <DesktopHeader {...props} />
      </Responsive>
    </React.Fragment>
  );
}

SiteHeader.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SiteHeader);
