import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileHeaderMainMenu, { mobileHeaderMainMenuDataShape } from '../../mobile-header/MobileHeaderMainMenu';

const MobileMainMenuSlot = ({
  menu,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_mobile_main_menu.v1"
    idAliases={['mobile_main_menu_slot']}
    slotOptions={{
      mergeProps: true,
    }}
    pluginProps={{ menu }}
  >
    <MobileHeaderMainMenu menu={menu} />
  </PluginSlot>
);

MobileMainMenuSlot.propTypes = {
  menu: mobileHeaderMainMenuDataShape,
};

export default MobileMainMenuSlot;
