/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { NotificationsNone, Settings } from '@edx/paragon/icons';
import {
  Badge, Icon, IconButton, OverlayTrigger, Popover,
} from '@edx/paragon';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import NotificationTabs from './NotificationTabs';
import { getNotificationTabsCount } from './data/selectors';
import { resetNotificationState } from './data/thunks';
import { messages } from './messages';
import { useIsOnMediumScreen, useIsOnLargeScreen } from './data/hook';

const Notifications = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const [showNotificationTray, setShowNotificationTray] = useState(false);
  const notificationCounts = useSelector(getNotificationTabsCount());
  const isOnMediumScreen = useIsOnMediumScreen();
  const isOnLargeScreen = useIsOnLargeScreen();

  console.log('isOnMediumScreen', isOnMediumScreen);
  console.log('isOnLargeScreen', isOnLargeScreen);

  const handleNotificationTray = useCallback((value) => {
    setShowNotificationTray(value);
    if (!value) { dispatch(resetNotificationState()); }
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (popoverRef.current?.contains(event.target) !== true && buttonRef.current?.contains(event.target) !== true) {
      setShowNotificationTray(false);
      dispatch(resetNotificationState());
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <OverlayTrigger
      trigger="click"
      key="bottom"
      placement="bottom"
      id="notificationTray"
      show={showNotificationTray}
      overlay={(
        <Popover
          id="notificationTray"
          data-testid="notificationTray"
          className={classNames('notification-tray-container overflow-auto rounded-0 border-0', {
            'w-100': !isOnMediumScreen && !isOnLargeScreen,
            'medium-screen': isOnMediumScreen,
            'large-screen': isOnLargeScreen,
          })}
        >
          <div ref={popoverRef}>
            <Popover.Title as="h2" className="d-flex justify-content-between p-0 m-4 border-0 text-primary-500 font-size-18 line-height-24">
              {intl.formatMessage(messages.notificationTitle)}
              <Icon src={Settings} className="icon-size-20" />
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
          isActive={showNotificationTray}
          alt="notification bell icon"
          onClick={() => { handleNotificationTray(!showNotificationTray); }}
          src={NotificationsNone}
          iconAs={Icon}
          variant="light"
          iconClassNames="text-primary-500"
          className="ml-4 mr-1 my-3 notification-button"
        />
        <Badge
          variant="danger"
          pill
          className="font-weight-normal px-1 font-size-9 notification-badge"
        >
          { notificationCounts?.count > 0 && notificationCounts?.count}
        </Badge>
      </div>
    </OverlayTrigger>
  );
};

export default Notifications;
