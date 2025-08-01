import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileUserMenuToggle, {
  MobileUserMenuTogglePropTypes,
} from '../../mobile-header/MobileUserMenuToggle';

const MobileUserMenuToggleSlot = ({
  avatar,
  label,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_mobile_user_menu_trigger.v1"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <MobileUserMenuToggle avatar={avatar} label={label} />
  </PluginSlot>
);

MobileUserMenuToggleSlot.propTypes = MobileUserMenuTogglePropTypes;

export default MobileUserMenuToggleSlot;
