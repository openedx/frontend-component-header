import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

// Local Components
import MobileUserMenuToggleSlot from '../plugin-slots/MobileUserMenuToggleSlot';
import { Menu, MenuTrigger, MenuContent } from '../Menu';
import LogoSlot from '../plugin-slots/LogoSlot';
import MobileLoggedOutItemsSlot from '../plugin-slots/MobileLoggedOutItemsSlot';
import { mobileHeaderLoggedOutItemsDataShape } from './MobileLoggedOutItems';
import MobileMainMenuSlot from '../plugin-slots/MobileMainMenuSlot';
import { mobileHeaderMainMenuDataShape } from './MobileHeaderMainMenu';
import MobileUserMenuSlot from '../plugin-slots/MobileUserMenuSlot';
import { mobileHeaderUserMenuDataShape } from './MobileHeaderUserMenu';

// i18n
import messages from '../Header.messages';

// Assets
import { MenuIcon } from '../Icons';

const MobileHeader = ({
  mainMenu,
  secondaryMenu,
  userMenu,
  loggedOutItems,
  logo,
  logoAltText,
  logoDestination,
  avatar,
  username,
  loggedIn,
  stickyOnMobile,
}) => {
  const intl = useIntl();

  const renderMainMenu = () => <MobileMainMenuSlot menu={[...mainMenu, ...secondaryMenu]} />;

  const renderUserMenuItems = () => <MobileUserMenuSlot menu={userMenu} />;

  const renderLoggedOutItems = () => <MobileLoggedOutItemsSlot items={loggedOutItems} />;

  const renderUserMenuToggle = () => <MobileUserMenuToggleSlot avatar={avatar} label={username} />;

  const logoProps = { src: logo, alt: logoAltText, href: logoDestination };
  const stickyClassName = stickyOnMobile ? 'sticky-top' : '';
  const logoClasses = getConfig().AUTHN_MINIMAL_HEADER ? 'justify-content-left pl-3' : 'justify-content-center';

  return (
    <header
      aria-label={intl.formatMessage(messages['header.label.main.header'])}
      className={`site-header-mobile d-flex justify-content-between align-items-center shadow ${stickyClassName}`}
    >
      <a className="nav-skip sr-only sr-only-focusable" href="#main">{intl.formatMessage(messages['header.label.skip.nav'])}</a>
      {mainMenu.length > 0 ? (
        <div className="w-100 d-flex justify-content-start">

          <Menu className="position-static">
            <MenuTrigger
              tag="button"
              className="icon-button"
              aria-label={intl.formatMessage(messages['header.label.main.menu'])}
              title={intl.formatMessage(messages['header.label.main.menu'])}
            >
              <MenuIcon role="img" aria-hidden focusable="false" style={{ width: '1.5rem', height: '1.5rem' }} />
            </MenuTrigger>
            <MenuContent
              tag="nav"
              aria-label={intl.formatMessage(messages['header.label.main.nav'])}
              className="nav flex-column pin-left pin-right border-top shadow py-2"
            >
              {renderMainMenu()}
            </MenuContent>
          </Menu>
        </div>
      ) : null}
      <div className={`w-100 d-flex ${logoClasses}`}>
        <LogoSlot {...logoProps} itemType="http://schema.org/Organization" />
      </div>
      {userMenu.length > 0 || loggedOutItems.length > 0 ? (
        <div className="w-100 d-flex justify-content-end align-items-center">
          <Menu tag="nav" aria-label={intl.formatMessage(messages['header.label.secondary.nav'])} className="position-static">
            <MenuTrigger
              tag="button"
              className="icon-button"
              aria-label={intl.formatMessage(messages['header.label.account.menu'])}
              title={intl.formatMessage(messages['header.label.account.menu'])}
            >
              {renderUserMenuToggle()}
            </MenuTrigger>
            <MenuContent tag="ul" className="nav flex-column pin-left pin-right border-top shadow py-2">
              {loggedIn ? renderUserMenuItems() : renderLoggedOutItems()}
            </MenuContent>
          </Menu>
        </div>
      ) : null}
    </header>
  );
};

export const mobileHeaderDataShape = {
  mainMenu: mobileHeaderMainMenuDataShape,
  secondaryMenu: mobileHeaderMainMenuDataShape,
  userMenu: mobileHeaderUserMenuDataShape,
  loggedOutItems: mobileHeaderLoggedOutItemsDataShape,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([false, null]),
  ]),
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
  stickyOnMobile: PropTypes.bool,
};

MobileHeader.propTypes = {
  mainMenu: mobileHeaderDataShape.mainMenu,
  secondaryMenu: mobileHeaderDataShape.secondaryMenu,
  userMenu: mobileHeaderDataShape.userMenu,
  loggedOutItems: mobileHeaderDataShape.loggedOutItems,
  logo: mobileHeaderDataShape.logo,
  logoAltText: mobileHeaderDataShape.logoAltText,
  logoDestination: mobileHeaderDataShape.logoDestination,
  avatar: mobileHeaderDataShape.avatar,
  username: mobileHeaderDataShape.username,
  loggedIn: mobileHeaderDataShape.loggedIn,
  stickyOnMobile: mobileHeaderDataShape.stickyOnMobile,
};

MobileHeader.defaultProps = {
  mainMenu: [],
  secondaryMenu: [],
  userMenu: [],
  loggedOutItems: [],
  logo: null,
  logoAltText: null,
  logoDestination: null,
  avatar: null,
  username: null,
  loggedIn: false,
  stickyOnMobile: true,

};

export default MobileHeader;
