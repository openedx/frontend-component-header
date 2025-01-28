import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton } from '@openedx/paragon';
import { Link } from 'react-router-dom';
var NavDropdownMenu = function NavDropdownMenu(_ref) {
  var id = _ref.id,
    buttonTitle = _ref.buttonTitle,
    items = _ref.items;
  return /*#__PURE__*/React.createElement(DropdownButton, {
    id: id,
    title: buttonTitle,
    variant: "outline-primary",
    className: "mr-2"
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement(Dropdown.Item, {
      as: Link,
      key: "".concat(item.title, "-dropdown-item"),
      to: item.href,
      className: "small"
    }, item.title);
  }));
};
NavDropdownMenu.propTypes = {
  id: PropTypes.string.isRequired,
  buttonTitle: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired
  })).isRequired
};
export default NavDropdownMenu;
//# sourceMappingURL=NavDropdownMenu.js.map