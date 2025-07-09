import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileUserMenuToggle, {
  MobileUserMenuTogglePropTypes,
} from '../../mobile-header/MobileUserMenuToggle';

const MobileUserMenuToggleSlot = ({
  avatar,
  username,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_mobile_user_menu_trigger.v1"
    idAliases={['learning_mobile_user_menu_trigger_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <MobileUserMenuToggle avatar={avatar} username={username} />
  </PluginSlot>
);

MobileUserMenuToggleSlot.propTypes = MobileUserMenuTogglePropTypes;

export default MobileUserMenuToggleSlot;
