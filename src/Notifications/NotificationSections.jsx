/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@edx/paragon';
import PropTypes from 'prop-types';
import { messages } from './messages';
import NotificationRowItem from './NotificationRowItem';
import {
  getSelectedAppNotificationIds, getSelectedAppName, getNotificationsByIds, getPaginationData,
} from './data/selectors';
import { splitNotificationsByTime } from './utils';
import { markAllNotificationsAsRead } from './data/thunks';

const NotificationSections = ({ handleLoadMoreNotification }) => {
  const intl = useIntl();
  const selectedAppName = useSelector(getSelectedAppName());
  const notificationIds = useSelector(getSelectedAppNotificationIds(selectedAppName));
  const notifications = useSelector(getNotificationsByIds(notificationIds));
  const paginationData = useSelector(getPaginationData());
  const { today = [], earlier = [] } = splitNotificationsByTime(notifications);
  const dispatch = useDispatch();

  const handleMarkAllAsRead = useCallback(() => {
    dispatch(markAllNotificationsAsRead(selectedAppName));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAppName]);

  return (
    notifications && (
    <div className="mt-4 px-4">
      <div className="d-flex flex-row justify-content-between pb-2">
        {today.length > 0 && (
        <>
          <span className="text-gray-500">
            { intl.formatMessage(messages.notificationTodayHeading)}
          </span>
          {today.length + earlier.length > 0 && (
          <span className="text-info-500 line-height-24 cursor-pointer" onClick={handleMarkAllAsRead}>
            {intl.formatMessage(messages.notificationMarkAsRead)}
          </span>
          )}
        </>
        )}
      </div>
        {today.map(
          (notification) => <NotificationRowItem notification={notification} />,
        )}

      <div className="d-flex flex-row justify-content-between pb-2">
        <span className="text-gray-500">
          {earlier.length > 0
            && intl.formatMessage(messages.notificationEarlierHeading)}
        </span>
        {today.length + earlier.length > 0 && today.length === 0 && (
        <span className="text-info-500 line-height-24 cursor-pointer" onClick={handleMarkAllAsRead}>
          {intl.formatMessage(messages.notificationMarkAsRead)}
        </span>
        )}
      </div>
      {earlier.map(
        (notification) => <NotificationRowItem notification={notification} />,
      )}
      {paginationData.currentPage < paginationData.numPages && (
      <Button
        variant="primary"
        className="w-100 bg-primary-500"
        onClick={handleLoadMoreNotification}
      >
        {intl.formatMessage(messages.loadMoreNotifications)}
      </Button>
      )}
    </div>
    )
  );
};

NotificationSections.propTypes = {
  handleLoadMoreNotification: PropTypes.func.isRequired,
};

export default React.memo(NotificationSections);
