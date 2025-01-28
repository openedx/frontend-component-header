import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopHeaderUserMenu, { desktopUserMenuDataShape } from '../../desktop-header/DesktopHeaderUserMenu';
var DesktopUserMenuSlot = function DesktopUserMenuSlot(_ref) {
  var menu = _ref.menu;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "desktop_user_menu_slot",
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(DesktopHeaderUserMenu, {
    menu: menu
  }));
};
DesktopUserMenuSlot.propTypes = {
  menu: desktopUserMenuDataShape
};
export default DesktopUserMenuSlot;
//# sourceMappingURL=index.js.map