import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopHeader, { desktopHeaderDataShape } from '../../desktop-header/DesktopHeader';
var DesktopHeaderSlot = function DesktopHeaderSlot(_ref) {
  var props = _ref.props;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "desktop_header_slot",
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(DesktopHeader, props));
};
DesktopHeaderSlot.propTypes = desktopHeaderDataShape;
export default DesktopHeaderSlot;
//# sourceMappingURL=index.js.map