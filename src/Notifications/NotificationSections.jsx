import React, { useCallback, useMemo } from 'react';
import { Button, Spinner } from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import isEmpty from 'lodash/isEmpty';
import messages from './messages';
import NotificationRowItem from './NotificationRowItem';
import { markAllNotificationsAsRead } from './data/thunks';
import {
  selectNotificationsByIds, selectPaginationData, selectSelectedAppName, selectNotificationStatus,
} from './data/selectors';
import { splitNotificationsByTime } from './utils';
import { updatePaginationRequest, RequestStatus } from './data/slice';

const NotificationSections = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const selectedAppName = useSelector(selectSelectedAppName());
  const notificationRequestStatus = useSelector(selectNotificationStatus());
  const notifications = useSelector(selectNotificationsByIds(selectedAppName));
  const { hasMorePages } = useSelector(selectPaginationData());
  const { today = [], earlier = [] } = useMemo(
    () => splitNotificationsByTime(notifications),
    [notifications],
  );

  const handleMarkAllAsRead = useCallback(() => {
    dispatch(markAllNotificationsAsRead(selectedAppName));
  }, [dispatch, selectedAppName]);

  const updatePagination = useCallback(() => {
    dispatch(updatePaginationRequest());
  }, [dispatch]);

  const renderNotificationSection = (section, items) => {
    if (isEmpty(items)) { return null; }

    return (
      <div className="pb-2">
        <div className="d-flex justify-content-between align-items-center py-10px mb-2">
          <span className="text-gray-500 line-height-10">
            {section === 'today' && intl.formatMessage(messages.notificationTodayHeading)}
            {section === 'earlier' && intl.formatMessage(messages.notificationEarlierHeading)}
          </span>
          {notifications?.length > 0 && (section === 'earlier' ? today.length === 0 : true) && (
            <Button
              variant="link"
              className="text-info-500 font-size-14 line-height-10 text-decoration-none p-0 border-0"
              onClick={handleMarkAllAsRead}
              data-testid="mark-all-read"
            >
              {intl.formatMessage(messages.notificationMarkAsRead)}
            </Button>
          )}
        </div>
        {items.map((notification) => (
          <NotificationRowItem
            key={notification.id}
            id={notification.id}
            type={notification.type}
            contentUrl={notification.contentUrl}
            content={notification.content}
            courseName={notification.contentContext?.courseName || ''}
            createdAt={notification.createdAt}
            lastRead={notification.lastRead}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-4 px-4" data-testid="notification-tray-section">
      {renderNotificationSection('today', today)}
      {renderNotificationSection('earlier', earlier)}
      {hasMorePages && notificationRequestStatus === RequestStatus.IN_PROGRESS ? (
        <div className="d-flex justify-content-center p-4">
          <Spinner animation="border" variant="primary" size="lg" />
        </div>
      ) : (hasMorePages && notificationRequestStatus === RequestStatus.SUCCESSFUL
        && (
          <Button
            variant="primary"
            className="w-100 bg-primary-500"
            onClick={updatePagination}
            data-testid="load-more-notifications"
          >
            {intl.formatMessage(messages.loadMoreNotifications)}
          </Button>
        )
      )}
    </div>
  );
};

export default React.memo(NotificationSections);
