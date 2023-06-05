import React, { useCallback, useMemo } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@edx/paragon';
import isEmpty from 'lodash/isEmpty';
import { messages } from './messages';
import NotificationRowItem from './NotificationRowItem';
import {
  getSelectedAppNotificationIds,
  getSelectedAppName,
  getNotificationsByIds,
  getPaginationData,
} from './data/selectors';
import { splitNotificationsByTime } from './utils';
import { markAllNotificationsAsRead } from './data/thunks';

const NotificationSections = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const selectedAppName = useSelector(getSelectedAppName());
  const notificationIds = useSelector(getSelectedAppNotificationIds(selectedAppName));
  const notifications = useSelector(getNotificationsByIds(notificationIds));
  const paginationData = useSelector(getPaginationData());
  const { today = [], earlier = [] } = useMemo(
    () => splitNotificationsByTime(notifications),
    [notifications],
  );

  const handleMarkAllAsRead = useCallback(() => {
    dispatch(markAllNotificationsAsRead(selectedAppName));
  }, [dispatch, selectedAppName]);

  const renderNotificationSection = (section, items) => {
    if (isEmpty(items)) { return null; }

    return (
      <div className="pb-2">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <span className="text-gray-500">
            {section === 'today' && intl.formatMessage(messages.notificationTodayHeading)}
            {section === 'earlier' && intl.formatMessage(messages.notificationEarlierHeading)}
          </span>
          {notifications?.length > 0 && (section === 'earlier' ? today.length === 0 : true) && (
            <span className="text-info-500 line-height-24 cursor-pointer" onClick={handleMarkAllAsRead}>
              {intl.formatMessage(messages.notificationMarkAsRead)}
            </span>
          )}
        </div>
        {items.map((notification) => (
          <NotificationRowItem
            key={notification.id}
            id={notification.id}
            type={notification.type}
            contentUrl={notification.contentUrl}
            content={notification.content}
            courseName={notification.courseName}
            createdAt={notification.createdAt}
            lastRead={notification.lastRead}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-4 px-4">
      {renderNotificationSection('today', today)}
      {renderNotificationSection('earlier', earlier)}
      {paginationData.currentPage < paginationData.numPages && (
        <Button variant="primary" className="w-100 bg-primary-500" onClick={() => {}}>
          {intl.formatMessage(messages.loadMoreNotifications)}
        </Button>
      )}
    </div>
  );
};

export default React.memo(NotificationSections);
