import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileHeaderUserMenu, { mobileHeaderUserMenuDataShape } from '../../mobile-header/MobileHeaderUserMenu';

const MobileUserMenuSlot = ({
  menu,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_mobile_user_menu.v1"
    idAliases={['mobile_user_menu_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <MobileHeaderUserMenu menu={menu} />
  </PluginSlot>
);

MobileUserMenuSlot.propTypes = {
  menu: mobileHeaderUserMenuDataShape,
};

export default MobileUserMenuSlot;
