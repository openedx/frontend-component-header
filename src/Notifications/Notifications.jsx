import React, { useState, useCallback, useEffect } from 'react';
import { NotificationsNone, Settings } from '@edx/paragon/icons';
import {
  Badge, Form, Icon, IconButton, OverlayTrigger, Popover,
} from '@edx/paragon';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import NotificationTabs from './NotificationTabs';
import { getNotificationTotalUnseenCounts, getNotificationStatus } from './data/selectors';
import { fetchNotificationsCountsList } from './data/thunks';
import { messages } from './messages';

const Notifications = () => {
  const [showNotificationTray, setShowNotificationTray] = useState(false);
  const notificationCounts = useSelector(getNotificationTotalUnseenCounts());
  const intl = useIntl();

  const dispatch = useDispatch();
  const notificationStatus = useSelector(getNotificationStatus());

  useEffect(() => {
    if (notificationStatus === 'idle') {
      dispatch(fetchNotificationsCountsList());
    }
  }, [dispatch, notificationStatus]);

  const handleNotificationTray = useCallback((value) => {
    setShowNotificationTray(value);
  }, []);

  return (
    <div className="d-flex mx-4 my-3 bell-container">
      <OverlayTrigger
        trigger="click"
        key="bottom"
        placement="bottom"
        show={showNotificationTray}
        overlay={(
          <Popover
            id="popover-positioned-bottom"
            className="notification-tray-container"
          >
            <Popover.Title as="h3" style={{ padding: '0px 26px 16px 24px', border: 'none' }}>
              <h2 className="text-primary-500 notification-title">
                {intl.formatMessage(messages.notificationTitle)}
              </h2>
              <div className="setting-icon-container">
                <Icon src={Settings} />
              </div>
            </Popover.Title>
            <Popover.Content className="notification-content">
              <NotificationTabs />
            </Popover.Content>
          </Popover>
      )}
      >
        <>
          {notificationCounts?.Total > 0 && (
          <Badge variant="danger position-absolute d-flex flex-row justify-content-center align-items-center">
            <Form.Label className="count">{notificationCounts?.Total}</Form.Label>
          </Badge>
          )}
          <div className="bell-icon-container">
            <IconButton
              onClick={() => { handleNotificationTray(!showNotificationTray); }}
              src={NotificationsNone}
              iconAs={Icon}
              className="d-inline-block align-bottom ml-1 bell-icon"
            />
          </div>
        </>
      </OverlayTrigger>
    </div>
  );
};

export default Notifications;
