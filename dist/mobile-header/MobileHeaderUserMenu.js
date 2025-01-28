import React from 'react';
import PropTypes from 'prop-types';
var MobileHeaderUserMenu = function MobileHeaderUserMenu(_ref) {
  var menu = _ref.menu;
  return menu.map(function (group) {
    return group.items.map(function (_ref2) {
      var type = _ref2.type,
        content = _ref2.content,
        href = _ref2.href,
        disabled = _ref2.disabled,
        isActive = _ref2.isActive,
        onClick = _ref2.onClick;
      return /*#__PURE__*/React.createElement("li", {
        className: "nav-item",
        key: "".concat(type, "-").concat(content)
      }, /*#__PURE__*/React.createElement("a", {
        className: "nav-link".concat(isActive ? ' active' : '').concat(disabled ? ' disabled' : ''),
        href: href,
        onClick: onClick || null
      }, content));
    });
  });
};
export var mobileHeaderUserMenuDataShape = PropTypes.arrayOf(PropTypes.shape({
  heading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func
  }))
}));
MobileHeaderUserMenu.propTypes = {
  menu: mobileHeaderUserMenuDataShape
};
export default MobileHeaderUserMenu;
//# sourceMappingURL=MobileHeaderUserMenu.js.map