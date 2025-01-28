import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuTrigger, MenuContent } from '../Menu';
var MobileHeaderMainMenu = function MobileHeaderMainMenu(_ref) {
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
      className: "nav-item"
    }, /*#__PURE__*/React.createElement(MenuTrigger, {
      onClick: onClick || null,
      tag: "a",
      role: "button",
      tabIndex: "0",
      className: "nav-link"
    }, content), /*#__PURE__*/React.createElement(MenuContent, {
      className: "position-static pin-left pin-right py-2"
    }, submenuContent));
  });
};
export var mobileHeaderMainMenuDataShape = PropTypes.oneOfType([PropTypes.node, PropTypes.array]);
MobileHeaderMainMenu.propTypes = {
  menu: mobileHeaderMainMenuDataShape
};
export default MobileHeaderMainMenu;
//# sourceMappingURL=MobileHeaderMainMenu.js.map