import React from 'react';
import PropTypes from 'prop-types';
var MobileLoggedOutItems = function MobileLoggedOutItems(_ref) {
  var items = _ref.items;
  return items.map(function (_ref2, i, arr) {
    var type = _ref2.type,
      href = _ref2.href,
      content = _ref2.content;
    return /*#__PURE__*/React.createElement("li", {
      className: "nav-item px-3 my-2",
      key: "".concat(type, "-").concat(content)
    }, /*#__PURE__*/React.createElement("a", {
      className: i < arr.length - 1 ? 'btn btn-block btn-outline-primary' : 'btn btn-block btn-primary',
      href: href
    }, content));
  });
};
export var mobileHeaderLoggedOutItemsDataShape = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.oneOf(['item', 'menu']),
  href: PropTypes.string,
  content: PropTypes.string
}));
MobileLoggedOutItems.propTypes = {
  menu: mobileHeaderLoggedOutItemsDataShape
};
export default MobileLoggedOutItems;
//# sourceMappingURL=MobileLoggedOutItems.js.map