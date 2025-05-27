import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';

import LearningUserMenuSlot from '../plugin-slots/LearningUserMenuSlot';

import messages from './messages';

const AuthenticatedUserDropdown = ({ intl, username }) => {
  const firstMenuItemRef = useRef(null);
  const lastMenuItemRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      const isShiftTab = event.shiftKey;
      const currentElement = document.activeElement;
      const focusElement = isShiftTab
        ? currentElement.previousElementSibling
        : currentElement.nextElementSibling;

      // If the element has reached the start or end of the list, loop the focus
      if (isShiftTab && currentElement === firstMenuItemRef.current) {
        lastMenuItemRef.current.focus();
      } else if (!isShiftTab && currentElement === lastMenuItemRef.current) {
        firstMenuItemRef.current.focus();
      } else if (focusElement && focusElement.tagName === 'A') {
        focusElement.focus();
      }
    }
  };

  const dropdownItems = [
    {
      message: intl.formatMessage(messages.dashboard),
      href: `${getConfig().LMS_BASE_URL}/dashboard`,
    },
    {
      message: intl.formatMessage(messages.profile),
      href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${username}`,
    },
    {
      message: intl.formatMessage(messages.account),
      href: getConfig().ACCOUNT_SETTINGS_URL,
    },
    ...(getConfig().ORDER_HISTORY_URL ? [{
      message: intl.formatMessage(messages.orderHistory),
      href: getConfig().ORDER_HISTORY_URL,
    }] : []),
    {
      message: intl.formatMessage(messages.signOut),
      href: getConfig().LOGOUT_URL,
    },
  ];

  return (
    <Dropdown className="user-dropdown ml-3">
      <Dropdown.Toggle variant="outline-primary" aria-label={intl.formatMessage(messages.userOptionsDropdownLabel)}>
        <FontAwesomeIcon icon={faUserCircle} className="d-md-none" size="lg" />
        <span data-hj-suppress className="d-none d-md-inline">
          {username}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-right" role="menu">
        <LearningUserMenuSlot
          items={dropdownItems}
          firstMenuItemRef={firstMenuItemRef}
          lastMenuItemRef={lastMenuItemRef}
          handleKeyDown={handleKeyDown}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired,
};

export default injectIntl(AuthenticatedUserDropdown);
