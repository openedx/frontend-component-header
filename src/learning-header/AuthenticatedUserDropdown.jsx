import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Avatar, Dropdown } from '@openedx/paragon';

import messages from './messages';

const AuthenticatedUserDropdown = ({
  intl, username, name,
}) => {
  const dashboardMenuItem = (
    <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/dashboard`}>
      {intl.formatMessage(messages.dashboard)}
    </Dropdown.Item>
  );

  // show avatar instead username if HIDE_USERNAME_FROM_HEADER flag is enabled
  const dropdownToggle = (
    <Dropdown.Toggle variant="outline-primary">
      <FontAwesomeIcon icon={faUserCircle} className="d-md-none" size="lg" />
      {getConfig().HIDE_USERNAME_FROM_HEADER ? (
        <Avatar size="sm" alt={name} className="mr-2" />
      ) : (
        <span data-hj-suppress className="d-none d-md-inline" data-testid="username">
          {username}
        </span>
      )}
    </Dropdown.Toggle>
  );

  return (
    <>
      <a className="text-gray-700" href={`${getConfig().SUPPORT_URL}`}>{intl.formatMessage(messages.help)}</a>
      <Dropdown className="user-dropdown ml-3">
        {dropdownToggle}
        <Dropdown.Menu className="dropdown-menu-right">
          {dashboardMenuItem}
          <Dropdown.Item href={`${getConfig().ACCOUNT_PROFILE_URL}/u/${username}`}>
            {intl.formatMessage(messages.profile)}
          </Dropdown.Item>
          <Dropdown.Item href={getConfig().ACCOUNT_SETTINGS_URL}>
            {intl.formatMessage(messages.account)}
          </Dropdown.Item>
          { getConfig().ORDER_HISTORY_URL && (
            <Dropdown.Item href={getConfig().ORDER_HISTORY_URL}>
              {intl.formatMessage(messages.orderHistory)}
            </Dropdown.Item>
          )}
          <Dropdown.Item href={getConfig().LOGOUT_URL}>
            {intl.formatMessage(messages.signOut)}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string,
};

AuthenticatedUserDropdown.defaultProps = {
  name: null,
};

export default injectIntl(AuthenticatedUserDropdown);
