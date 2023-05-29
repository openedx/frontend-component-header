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
import { getNotificationTotalUnseenCounts, getNotificationStatus } from './data/selectors';
import { fetchNotificationsCountsList } from './data/thunks';
import { messages } from './messages';
import { useIsOnDesktop, useIsOnXLDesktop } from './data/hook';

const Notifications = () => {
  const [showNotificationTray, setShowNotificationTray] = useState(false);
  const intl = useIntl();
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const notificationStatus = useSelector(getNotificationStatus());
  const notificationCounts = useSelector(getNotificationTotalUnseenCounts());
  const isOnDesktop = useIsOnDesktop();
  const isOnXLDesktop = useIsOnXLDesktop();

  useEffect(() => {
    if (notificationStatus === 'idle') {
      dispatch(fetchNotificationsCountsList());
    }
  }, [dispatch, notificationStatus]);

  const handleNotificationTray = useCallback((value) => {
    setShowNotificationTray(value);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current
        && buttonRef.current
        && !popoverRef.current.contains(event.target)
        && !buttonRef.current.contains(event.target)
      ) {
        setShowNotificationTray(false);
      }
    };
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
      show={showNotificationTray}
      overlay={(
        <Popover
          id="popover-positioned-bottom"
          style={{ maxHeight: 'calc(100% - 68px)', minHeight: '1220px', minWidth: '549px' }}
          className={classNames('notification-tray-container pt-4.5 pb-4.5 overflow-auto rounded-0 border-0', {
            'w-100': !isOnDesktop,
            'notificationbar-desktop-width': isOnDesktop && !isOnXLDesktop,
            'w-25 notificationbar-XL-width': isOnXLDesktop,
          })}
          data-testid="notificationbar"
        >
          <div ref={popoverRef}>
            <Popover.Title
              as="h3"
              className="d-flex flex-row justify-content-between py-0 mb-4 border-0 px-4"
            >
              <h2 className="text-primary-500 font-size-18 line-height-24">
                {intl.formatMessage(messages.notificationTitle)}
              </h2>
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
          className="ml-4 mr-1 my-3"
          style={{ width: '36px', height: '36px' }}
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
