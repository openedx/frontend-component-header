import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import NotificationsTray from '@edx/frontend-plugin-notifications';

const HeaderNotificationsSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_notifications_tray.v1"
  >
    <NotificationsTray />
  </PluginSlot>
);

export default HeaderNotificationsSlot;
