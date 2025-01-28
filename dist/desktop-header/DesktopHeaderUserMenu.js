import React from 'react';
import PropTypes from 'prop-types';
var DesktopHeaderUserMenu = function DesktopHeaderUserMenu(_ref) {
  var menu = _ref.menu;
  return menu.map(function (group, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/jsx-no-comment-textnodes,react/no-array-index-key
      React.createElement(React.Fragment, {
        key: index
      }, group.heading && /*#__PURE__*/React.createElement("div", {
        className: "dropdown-header",
        role: "heading",
        "aria-level": "1"
      }, group.heading), group.items.map(function (_ref2) {
        var type = _ref2.type,
          content = _ref2.content,
          href = _ref2.href,
          disabled = _ref2.disabled,
          isActive = _ref2.isActive,
          onClick = _ref2.onClick;
        return /*#__PURE__*/React.createElement("a", {
          className: "dropdown-".concat(type).concat(isActive ? ' active' : '').concat(disabled ? ' disabled' : ''),
          key: "".concat(type, "-").concat(content),
          href: href,
          onClick: onClick || null
        }, content);
      }), index < menu.length - 1 && /*#__PURE__*/React.createElement("div", {
        className: "dropdown-divider",
        role: "separator"
      }))
    );
  });
};
export var desktopUserMenuDataShape = PropTypes.arrayOf(PropTypes.shape({
  heading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func
  }))
}));
DesktopHeaderUserMenu.propTypes = {
  menu: desktopUserMenuDataShape
};
export default DesktopHeaderUserMenu;
//# sourceMappingURL=DesktopHeaderUserMenu.js.map