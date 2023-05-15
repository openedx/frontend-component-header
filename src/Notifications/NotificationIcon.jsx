import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NotificationsNone, Settings } from '@edx/paragon/icons';
import {
  Tabs, Tab, Badge, Form, Icon, IconButton, OverlayTrigger, Popover,
} from '@edx/paragon';
import NotificationRow from './NotificationRow';

const NotificationIcon = ({ notificationCounts }) => {
  const [showNotificationTray, setShowNotificationTray] = useState(false);

  const handleNotificationTray = useCallback((value) => {
    setShowNotificationTray(value);
  }, []);

  return (
    <div className="d-flex mx-4 my-3 bell-container">
      <OverlayTrigger
        trigger="click"
        key="bottom"
        placement="bottom"
        show
        overlay={(
          <Popover
            id="popover-positioned-bottom"
            style={{
              width: '549px', height: '100vh', marginTop: 34, padding: '32px 0px 24px', maxWidth: '549px',
            }}
          >
            <Popover.Title as="h3" style={{ padding: '0px 26px 16px 24px', border: 'none' }}>
              <h3 className="text-primary-500 notification-title"> Notifications </h3>
              <div className="setting-icon-container">
                <Icon src={Settings} />
              </div>
            </Popover.Title>
            <Popover.Content className="notification-content">
              <Tabs defaultActiveKey="discussions" id="uncontrolled-tab-example" className="notification-tabs">
                <Tab eventKey="reminders" title="Reminders" notification={10} tabClassName="notification-tab">
                  Hello I am the first panel.
                </Tab>
                <Tab eventKey="discussions" title="Discussions" tabClassName="notification-tab">
                  <NotificationRow />
                </Tab>
                <Tab eventKey="grades" title="Grades" notification={1} tabClassName="notification-tab">
                  Hello I am the third panel.
                </Tab>
                <Tab eventKey="authoringg" title="Authoring" notification={5} tabClassName="notification-tab">
                  Hello I am the fourth panel.
                </Tab>
                <Tab eventKey="help" title="Help" notification={10} tabClassName="notification-tab">
                  Hello I am the fifth panel.
                </Tab>
                <Tab eventKey="about" title="About" tabClassName="notification-tab">
                  Hello I am the sixth panel.
                </Tab>
              </Tabs>
            </Popover.Content>
          </Popover>
      )}
      >
        <>
          <Badge variant="danger position-absolute d-flex flex-row justify-content-center align-items-center">
            <Form.Label className="count">{notificationCounts[0]?.count}</Form.Label>
          </Badge>
          <div className="bell-icon-container">
            <IconButton
              onClick={() => { handleNotificationTray(!showNotificationTray); }}
              onBlur={() => { handleNotificationTray(false); }}
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

NotificationIcon.propTypes = {
  notificationCounts: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    count: PropTypes.string,
  })),
};

NotificationIcon.defaultProps = {
  notificationCounts: [],
};
export default NotificationIcon;
