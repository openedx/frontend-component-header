import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import LogoSlot from '../plugin-slots/LogoSlot';
import DesktopMainMenuSlot from '../plugin-slots/DesktopMainMenuSlot';
import DesktopSecondaryMenuSlot from '../plugin-slots/DesktopSecondaryMenuSlot';
import DesktopUserMenuToggleSlot from '../plugin-slots/DesktopUserMenuToggleSlot';
import DesktopUserMenuSlot from '../plugin-slots/DesktopUserMenuSlot';
import DesktopLoggedOutItemsSlot from '../plugin-slots/DesktopLoggedOutItemsSlot';
import { Menu, MenuTrigger, MenuContent } from '../Menu';
import getLearnerHeaderMenu from '../LearnerDashboardMenu';
import messages from '../Header.messages';

const LearningHeader = ({ showUserDropdown }) => {
  const intl = useIntl();
  const { authenticatedUser } = useContext(AppContext);

  const courseSearchUrl = getConfig().SEARCH_CATALOG_URL || null;
  const learnerMenu = authenticatedUser
    ? getLearnerHeaderMenu(intl.formatMessage, courseSearchUrl, authenticatedUser)
    : null;

  const mainMenu = learnerMenu ? learnerMenu.mainMenu : [];
  const secondaryMenu = learnerMenu ? learnerMenu.secondaryMenu : null;
  const userMenu = learnerMenu ? learnerMenu.userMenu : [];

  const loggedOutItems = [
    {
      type: 'item',
      href: getConfig().LOGIN_URL,
      content: intl.formatMessage(messages['header.user.menu.login']),
    },
    {
      type: 'item',
      href: `${getConfig().LMS_BASE_URL}/register`,
      content: intl.formatMessage(messages['header.user.menu.register']),
    },
  ];

  return (
    <header className="site-header-desktop">
      <a className="nav-skip sr-only sr-only-focusable" href="#main">
        {intl.formatMessage(messages['header.label.skip.nav'])}
      </a>
      <div className="container-fluid">
        <div className="custom-header-container">
          <div className="nav-container position-relative d-flex align-items-center">
            <LogoSlot
              href={`${getConfig().LMS_BASE_URL}/dashboard`}
              src={getConfig().LOGO_URL}
              alt={getConfig().SITE_NAME}
            />
            <nav
              aria-label={intl.formatMessage(messages['header.label.main.nav'])}
              className="nav main-nav"
            >
              <DesktopMainMenuSlot menu={mainMenu} />
            </nav>
            <nav
              aria-label={intl.formatMessage(messages['header.label.secondary.nav'])}
              className="nav secondary-menu-container align-items-center ml-auto"
            >
              {showUserDropdown && authenticatedUser ? (
                <>
                  {secondaryMenu && <DesktopSecondaryMenuSlot menu={secondaryMenu} />}
                  <Menu transitionClassName="menu-dropdown" transitionTimeout={250}>
                    <MenuTrigger
                      tag="button"
                      aria-label={intl.formatMessage(messages['header.label.account.menu.for'], { username: authenticatedUser.username })}
                      className="btn btn-outline-primary d-inline-flex align-items-center pl-2 pr-3"
                    >
                      <DesktopUserMenuToggleSlot avatar={authenticatedUser.avatar} label={authenticatedUser.username} />
                    </MenuTrigger>
                    <MenuContent className="mb-0 dropdown-menu show dropdown-menu-right pin-right shadow py-2">
                      <DesktopUserMenuSlot menu={userMenu} />
                    </MenuContent>
                  </Menu>
                </>
              ) : (
                <DesktopLoggedOutItemsSlot items={loggedOutItems} />
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

LearningHeader.propTypes = {
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  showUserDropdown: true,
};

export default LearningHeader;
