import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { desktopHeaderMainOrSecondaryMenuDataShape } from '../../../desktop-header/DesktopHeaderMainOrSecondaryMenu';
import HeaderNotificationsSlot from '../../HeaderNotificationsSlot';
import DesktopSecondaryMenuSlotV1 from '../v1';

const DesktopSecondaryMenuSlot = ({
  menu,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_desktop_secondary_menu.v2"
    pluginProps={{ menu }}
  >
    <HeaderNotificationsSlot />
    <DesktopSecondaryMenuSlotV1 menu={menu} />
  </PluginSlot>
);

DesktopSecondaryMenuSlot.propTypes = {
  menu: desktopHeaderMainOrSecondaryMenuDataShape,
};

export default DesktopSecondaryMenuSlot;
