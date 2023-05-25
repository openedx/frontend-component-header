import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
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
  const intl = useIntl();
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const notificationStatus = useSelector(getNotificationStatus());
  const notificationCounts = useSelector(getNotificationTotalUnseenCounts());

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
    <div className="mx-4 my-3 bell-container">
      <OverlayTrigger
        trigger="click"
        key="bottom"
        placement="bottom"
        show={showNotificationTray}
        overlay={(
          <Popover
            id="popover-positioned-bottom"
            className="notification-tray-container pt-4.5 pb-4 px-4 overflow-auto d-flex flex-column
            align-items-start position-absolute mt-2"
          >
            <div ref={popoverRef}>
              <Popover.Title
                as="h3"
                style={{ border: 'none' }}
                className="d-flex flex-row justify-content-between py-0 px-0 mb-4"
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
        <>
          {notificationCounts?.Total > 0 && (
          <Badge variant="danger position-absolute px-1.5 py-1.5 d-flex flex-row justify-content-center
           align-items-center zindex-1"
          >
            <Form.Label className="count font-size-9 mt-2">{notificationCounts?.Total}</Form.Label>
          </Badge>
          )}
          <div className="bell-icon-container rounded-circle" ref={buttonRef}>
            <IconButton
              onClick={() => { handleNotificationTray(!showNotificationTray); }}
              src={NotificationsNone}
              iconAs={Icon}
              className="d-inline-block align-bottom ml-1 ml-n1 shadow-none bg-transparent text-primary-500"
            />
          </div>
        </>
      </OverlayTrigger>
    </div>
  );
};

export default Notifications;
