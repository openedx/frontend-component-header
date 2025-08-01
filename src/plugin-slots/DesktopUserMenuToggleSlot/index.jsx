import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopUserMenuToggle, { DesktopUserMenuTogglePropTypes } from '../../desktop-header/DesktopUserMenuToggle';

const DesktopUserMenuToggleSlot = ({
  avatar,
  label,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_desktop_user_menu_toggle.v1"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <DesktopUserMenuToggle avatar={avatar} label={label} />
  </PluginSlot>
);

DesktopUserMenuToggleSlot.propTypes = DesktopUserMenuTogglePropTypes;

export default DesktopUserMenuToggleSlot;
