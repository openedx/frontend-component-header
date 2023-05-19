import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';
import { messages } from './messages';
import NotificationRowItem from './NotificationRowItem';
import { getNotifications } from './data/selectors';

const NotificationSections = () => {
  const intl = useIntl();
  const notifications = useSelector(getNotifications());

  return (
    notifications && (
    <div className="pt-4">
      <div className="d-flex pb-2 notification-section">
        <span className="w-100 px-0 text-gray-500">
          {notifications && notifications.TODAY && intl.formatMessage(messages.notificationTodayHeading)}
        </span>
        <span className="w-100 px-0 text-right text-info-500">
          {intl.formatMessage(messages.notificationMarkAsRead)}
        </span>
      </div>
      <div>
        {notifications && notifications.TODAY && notifications?.TODAY.map(
          (notification) => <NotificationRowItem notification={notification} />,
        )}
        <div className="d-flex pb-2 notification-section">
          <span className="w-100 px-0 text-gray-500">
            {notifications && notifications.EARLIER && intl.formatMessage(messages.notificationEarlierHeading)}
          </span>
        </div>
        {notifications && notifications.EARLIER && notifications?.EARLIER.map(
          (notification) => <NotificationRowItem notification={notification} />,
        )}
      </div>
    </div>
    )
  );
};

export default React.memo(NotificationSections);
