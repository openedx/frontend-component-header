import React from 'react';
import PropTypes from 'prop-types';
var DesktopLoggedOutItems = function DesktopLoggedOutItems(_ref) {
  var items = _ref.items;
  return items.map(function (item, i, arr) {
    return /*#__PURE__*/React.createElement("a", {
      key: "".concat(item.type, "-").concat(item.content),
      className: i < arr.length - 1 ? 'btn mr-2 btn-link' : 'btn mr-2 btn-outline-primary',
      href: item.href
    }, item.content);
  });
};
export var desktopLoggedOutItemsDataShape = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.oneOf(['item', 'menu']),
  href: PropTypes.string,
  content: PropTypes.string
}));
DesktopLoggedOutItems.propTypes = {
  items: desktopLoggedOutItemsDataShape
};
export default DesktopLoggedOutItems;
//# sourceMappingURL=DesktopLoggedOutItems.js.map