import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileHeaderUserMenu, { mobileHeaderUserMenuDataShape } from '../../mobile-header/MobileHeaderUserMenu';
var MobileUserMenuSlot = function MobileUserMenuSlot(_ref) {
  var menu = _ref.menu;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "mobile_user_menu_slot",
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(MobileHeaderUserMenu, {
    menu: menu
  }));
};
MobileUserMenuSlot.propTypes = {
  menu: mobileHeaderUserMenuDataShape
};
export default MobileUserMenuSlot;
//# sourceMappingURL=index.js.map