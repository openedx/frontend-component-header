import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopUserMenuToggle, { DesktopUserMenuTogglePropTypes } from '../../desktop-header/DesktopUserMenuToggle';

const DesktopUserMenuToggleSlot = ({
  avatar,
  username,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_desktop_user_menu_toggle.v1"
    idAliases={['desktop_user_menu_toggle_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <DesktopUserMenuToggle avatar={avatar} username={username} />
  </PluginSlot>
);

DesktopUserMenuToggleSlot.propTypes = DesktopUserMenuTogglePropTypes;

export default DesktopUserMenuToggleSlot;
