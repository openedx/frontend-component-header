/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import {
  Badge, Icon, IconButton, OverlayTrigger, Popover,
} from '@edx/paragon';
import { NotificationsNone, Settings } from '@edx/paragon/icons';
import { selectNotificationTabsCount } from './data/selectors';
import { resetNotificationState } from './data/thunks';
import { useIsOnLargeScreen, useIsOnMediumScreen } from './data/hook';
import NotificationTabs from './NotificationTabs';
import messages from './messages';

const Notifications = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const [enableNotificationTray, setEnableNotificationTray] = useState(false);
  const notificationCounts = useSelector(selectNotificationTabsCount());
  const isOnMediumScreen = useIsOnMediumScreen();
  const isOnLargeScreen = useIsOnLargeScreen();

  const hideNotificationTray = useCallback(() => {
    setEnableNotificationTray(prevState => !prevState);
  }, []);

  const handleClickOutsideNotificationTray = useCallback((event) => {
    if (!popoverRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) {
      setEnableNotificationTray(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideNotificationTray);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideNotificationTray);
      dispatch(resetNotificationState());
    };
  }, []);

  return (
    <OverlayTrigger
      trigger="click"
      key="bottom"
      placement="bottom"
      id="notificationTray"
      show={enableNotificationTray}
      overlay={(
        <Popover
          id="notificationTray"
          data-testid="notification-tray"
          className={classNames('overflow-auto rounded-0 border-0', {
            'w-100': !isOnMediumScreen && !isOnLargeScreen,
            'medium-screen': isOnMediumScreen,
            'large-screen': isOnLargeScreen,
          })}
        >
          <div ref={popoverRef}>
            <Popover.Title as="h2" className="d-flex justify-content-between p-0 m-4 border-0 text-primary-500 font-size-18 line-height-24">
              {intl.formatMessage(messages.notificationTitle)}
              <Icon src={Settings} className="icon-size-20" data-testid="setting-icon" />
            </Popover.Title>
            <Popover.Content className="notification-content p-0">
              <NotificationTabs />
            </Popover.Content>
          </div>
        </Popover>
      )}
    >
      <div ref={buttonRef}>
        <IconButton
          isActive={enableNotificationTray}
          alt="notification bell icon"
          onClick={hideNotificationTray}
          src={NotificationsNone}
          iconAs={Icon}
          variant="light"
          iconClassNames="text-primary-500"
          className="ml-4 mr-1 my-3 notification-button"
          data-testid="notification-bell-icon"
        />
        {notificationCounts?.count > 0 && (
          <Badge
            pill
            variant="danger"
            className="font-weight-normal px-1 notification-badge"
            data-testid="notification-count"
          >
            {notificationCounts.count}
          </Badge>
        )}
      </div>
    </OverlayTrigger>
  );
};

export default Notifications;
