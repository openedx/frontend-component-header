import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopHeaderUserMenu, { desktopUserMenuDataShape } from '../../desktop-header/DesktopHeaderUserMenu';

const DesktopUserMenuSlot = ({
  menu,
}) => (
  <PluginSlot
    id="desktop_user_menu_slot"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <DesktopHeaderUserMenu menu={menu} />
  </PluginSlot>
);

DesktopUserMenuSlot.propTypes = {
  menu: desktopUserMenuDataShape,
};

export default DesktopUserMenuSlot;
