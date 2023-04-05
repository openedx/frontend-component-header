import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  APP_CONFIG_INITIALIZED,
  ensureConfig,
  getConfig,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import { ActionRow } from '@edx/paragon';

import { Menu, MenuTrigger, MenuContent } from './Menu';
import Avatar from './Avatar';
import { LinkedLogo, Logo } from './Logo';

import { CaretIcon } from './Icons';

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

class StudioDesktopHeaderBase extends React.Component {
  constructor(props) { // eslint-disable-line no-useless-constructor
    super(props);
  }

  renderUserMenu() {
    const {
      userMenu,
      avatar,
      username,
      intl,
    } = this.props;

    return (
      <Menu transitionClassName="menu-dropdown" transitionTimeout={250}>
        <MenuTrigger
          tag="button"
          aria-label={intl.formatMessage(messages['header.label.account.menu.for'], { username })}
          className="btn btn-outline-primary d-inline-flex align-items-center pl-2 pr-3"
        >
          <Avatar size="1.5em" src={avatar} alt="" className="mr-2" />
          {username} <CaretIcon role="img" aria-hidden focusable="false" />
        </MenuTrigger>
        <MenuContent className="mb-0 dropdown-menu show dropdown-menu-right pin-right shadow py-2">
          {userMenu.map(({ type, href, content }) => (
            <a className={`dropdown-${type}`} key={`${type}-${content}`} href={href}>{content}</a>
          ))}
        </MenuContent>
      </Menu>
    );
  }

  renderLoggedOutItems() {
    const { loggedOutItems } = this.props;

    return loggedOutItems.map((item, i, arr) => (
      <a
        key={`${item.type}-${item.content}`}
        className={i < arr.length - 1 ? 'btn mr-2 btn-link' : 'btn mr-2 btn-outline-primary'}
        href={item.href}
      >
        {item.content}
      </a>
    ));
  }

  render() {
    const {
      logo,
      logoAltText,
      logoDestination,
      loggedIn,
      intl,
      actionRowContent,
    } = this.props;
    const logoProps = { src: logo, alt: logoAltText, href: logoDestination };
    const logoClasses = getConfig().AUTHN_MINIMAL_HEADER ? 'mw-100' : null;

    return (
      <header className="site-header-desktop">
        <a className="nav-skip sr-only sr-only-focusable" href="#main">{intl.formatMessage(messages['header.label.skip.nav'])}</a>
        <div className={`container-fluid ${logoClasses}`}>
          <div className="nav-container position-relative d-flex align-items-center">
            {logoDestination === null ? <Logo className="logo" src={logo} alt={logoAltText} /> : <LinkedLogo className="logo" {...logoProps} />}
            <ActionRow>
              {actionRowContent}
              <nav
                aria-label={intl.formatMessage(messages['header.label.secondary.nav'])}
                className="nav secondary-menu-container align-items-center ml-auto"
              >
                {loggedIn ? this.renderUserMenu() : this.renderLoggedOutItems()}
              </nav>
            </ActionRow>
          </div>
        </div>
      </header>
    );
  }
}

StudioDesktopHeaderBase.propTypes = {
  userMenu: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
  })),
  loggedOutItems: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
  })),
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
  actionRowContent: PropTypes.element,

  // i18n
  intl: intlShape.isRequired,
};

StudioDesktopHeaderBase.defaultProps = {
  userMenu: [],
  loggedOutItems: [],
  logo: null,
  logoAltText: null,
  logoDestination: null,
  avatar: null,
  username: null,
  loggedIn: false,
  actionRowContent: null,
};

const StudioDesktopHeader = injectIntl(StudioDesktopHeaderBase);

const StudioHeader = ({ intl, actionRowContent }) => {
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
    actionRowContent,
    userMenu,
    loggedOutItems: [],
  };

  return <StudioDesktopHeader {...props} />;
};

StudioHeader.propTypes = {
  intl: intlShape.isRequired,
  actionRowContent: PropTypes.element,
};

StudioHeader.defaultProps = {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  actionRowContent: <></>,
};

export default injectIntl(StudioHeader);
