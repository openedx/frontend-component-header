import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopHeaderMainOrSecondaryMenu, { desktopHeaderMainOrSecondaryMenuDataShape } from '../../desktop-header/DesktopHeaderMainOrSecondaryMenu';

const DesktopMainMenuSlot = ({
  menu,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_desktop_main_menu.v1"
    idAliases={['desktop_main_menu_slot']}
    slotOptions={{
      mergeProps: true,
    }}
    pluginProps={{ menu }}
  >
    <DesktopHeaderMainOrSecondaryMenu menu={menu} />
  </PluginSlot>
);

DesktopMainMenuSlot.propTypes = {
  menu: desktopHeaderMainOrSecondaryMenuDataShape,
};

export default DesktopMainMenuSlot;
