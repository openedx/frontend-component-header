import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuTrigger, MenuContent } from '../Menu';
import { CaretIcon } from '../Icons';
var DesktopHeaderMainOrSecondaryMenu = function DesktopHeaderMainOrSecondaryMenu(_ref) {
  var menu = _ref.menu;
  // Nodes are accepted as a prop
  if (!Array.isArray(menu)) {
    return menu;
  }
  return menu.map(function (menuItem) {
    var type = menuItem.type,
      href = menuItem.href,
      content = menuItem.content,
      submenuContent = menuItem.submenuContent,
      disabled = menuItem.disabled,
      isActive = menuItem.isActive,
      onClick = menuItem.onClick;
    if (type === 'item') {
      return /*#__PURE__*/React.createElement("a", {
        key: "".concat(type, "-").concat(content),
        className: "nav-link".concat(disabled ? ' disabled' : '').concat(isActive ? ' active' : ''),
        href: href,
        onClick: onClick || null
      }, content);
    }
    return /*#__PURE__*/React.createElement(Menu, {
      key: "".concat(type, "-").concat(content),
      tag: "div",
      className: "nav-item",
      respondToPointerEvents: true
    }, /*#__PURE__*/React.createElement(MenuTrigger, {
      onClick: onClick || null,
      tag: "a",
      className: "nav-link d-inline-flex align-items-center",
      href: href
    }, content, " ", /*#__PURE__*/React.createElement(CaretIcon, {
      role: "img",
      "aria-hidden": true,
      focusable: "false"
    })), /*#__PURE__*/React.createElement(MenuContent, {
      className: "pin-left pin-right shadow py-2"
    }, submenuContent));
  });
};
export var desktopHeaderMainOrSecondaryMenuDataShape = PropTypes.oneOfType([PropTypes.node, PropTypes.array]);
DesktopHeaderMainOrSecondaryMenu.propTypes = {
  menu: desktopHeaderMainOrSecondaryMenuDataShape
};
export default DesktopHeaderMainOrSecondaryMenu;
//# sourceMappingURL=DesktopHeaderMainOrSecondaryMenu.js.map