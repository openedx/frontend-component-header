import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@openedx/paragon';
var LearningHeaderUserMenuItems = function LearningHeaderUserMenuItems(_ref) {
  var items = _ref.items;
  return items.map(function (item) {
    return /*#__PURE__*/React.createElement(Dropdown.Item, {
      href: item.href
    }, item.message);
  });
};
export var learningHeaderUserMenuDataShape = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string
  }))
};
LearningHeaderUserMenuItems.propTypes = learningHeaderUserMenuDataShape;
export default LearningHeaderUserMenuItems;
//# sourceMappingURL=LearningHeaderUserMenuItems.js.map