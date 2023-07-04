import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@edx/paragon';
import { useSelector, useDispatch } from 'react-redux';
import Notifications from '../Notifications';
import { selectShowNotificationTray, selectNotificationStatus } from '../Notifications/data/selectors';
import { fetchAppsNotificationCount } from '../Notifications/data/thunks';
import { RequestStatus } from '../Notifications/data/slice';

import messages from './messages';

const AuthenticatedUserDropdown = ({ intl, username }) => {
  const showNotificationsTray = useSelector(selectShowNotificationTray());
  const notificationStatus = useSelector(selectNotificationStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    if (notificationStatus === RequestStatus.IDLE) {
      dispatch(fetchAppsNotificationCount());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dashboardMenuItem = (
    <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/dashboard`}>
      {intl.formatMessage(messages.dashboard)}
    </Dropdown.Item>
  );

  return (
    <>
      <a className="text-gray-700" href={`${getConfig().SUPPORT_URL}`}>{intl.formatMessage(messages.help)}</a>
      {showNotificationsTray && <Notifications />}
      <Dropdown className="user-dropdown ml-3">
        <Dropdown.Toggle variant="outline-primary">
          <FontAwesomeIcon icon={faUserCircle} className="d-md-none" size="lg" />
          <span data-hj-suppress className="d-none d-md-inline">
            {username}
          </span>
        </Dropdown.Toggle>
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
};

export default injectIntl(AuthenticatedUserDropdown);
