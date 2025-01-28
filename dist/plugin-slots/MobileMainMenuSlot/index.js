import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileHeaderMainMenu, { mobileHeaderMainMenuDataShape } from '../../mobile-header/MobileHeaderMainMenu';
var MobileMainMenuSlot = function MobileMainMenuSlot(_ref) {
  var menu = _ref.menu;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "mobile_main_menu_slot",
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(MobileHeaderMainMenu, {
    menu: menu
  }));
};
MobileMainMenuSlot.propTypes = {
  menu: mobileHeaderMainMenuDataShape
};
export default MobileMainMenuSlot;
//# sourceMappingURL=index.js.map