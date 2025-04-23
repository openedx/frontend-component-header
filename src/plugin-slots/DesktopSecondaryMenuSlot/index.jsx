import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopHeaderMainOrSecondaryMenu, { desktopHeaderMainOrSecondaryMenuDataShape } from '../../desktop-header/DesktopHeaderMainOrSecondaryMenu';

const DesktopSecondaryMenuSlot = ({
  menu,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_desktop_secondary_menu.v1"
    idAliases={['desktop_secondary_menu_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <DesktopHeaderMainOrSecondaryMenu menu={menu} />
  </PluginSlot>
);

DesktopSecondaryMenuSlot.propTypes = {
  menu: desktopHeaderMainOrSecondaryMenuDataShape,
};

export default DesktopSecondaryMenuSlot;
