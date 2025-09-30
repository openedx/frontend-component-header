import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

const NotificationTraySlot = () => (
  <PluginSlot
    id="org.openedx.frontend.layout.notification_tray.v1"
    idAliases={["notification_tray_plugin"]}
  />
);

export default NotificationTraySlot;
