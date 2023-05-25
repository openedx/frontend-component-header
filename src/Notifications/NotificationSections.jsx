import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';
import { Button } from '@edx/paragon';
import PropTypes from 'prop-types';
import { messages } from './messages';
import NotificationRowItem from './NotificationRowItem';
import { getNotifications } from './data/selectors';

const NotificationSections = ({ handleLoadMoreNotification, loadMoreCount }) => {
  const intl = useIntl();
  const notifications = useSelector(getNotifications());
  const { TODAY, EARLIER, totalCount } = notifications || {};

  return (
    notifications && (
    <div className="pt-4 py-2.5">
      <div className="d-flex flex-row align-items-center pb-2">
        <span className="w-100 px-0 text-gray-500">
          {TODAY && TODAY.length > 0 && intl.formatMessage(messages.notificationTodayHeading)}
        </span>
        {totalCount > 0 && (
        <span className="w-100 px-0 text-right text-info-500">
          {intl.formatMessage(messages.notificationMarkAsRead)}
        </span>
        )}
      </div>
      <div>
        {TODAY && TODAY.map(
          (notification) => <NotificationRowItem notification={notification} />,
        )}
        <div className="d-flex pb-2 notification-section">
          <span className="w-100 px-0 text-gray-500">
            {EARLIER && EARLIER.length > 0
            && intl.formatMessage(messages.notificationEarlierHeading)}
          </span>
        </div>
        {EARLIER && EARLIER.map(
          (notification) => <NotificationRowItem notification={notification} />,
        )}
        {loadMoreCount < totalCount && (
        <Button
          variant="primary"
          className="mb-2 mb-sm-0 w-100 bg-primary-500"
          onClick={() => handleLoadMoreNotification(loadMoreCount + 10)}
        >
          {intl.formatMessage(messages.loadMoreNotifications)}
        </Button>
        )}
      </div>
    </div>
    )
  );
};

NotificationSections.propTypes = {
  handleLoadMoreNotification: PropTypes.func.isRequired,
  loadMoreCount: PropTypes.number.isRequired,
};

export default React.memo(NotificationSections);
