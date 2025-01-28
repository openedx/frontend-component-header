import React from 'react';
import PropTypes from 'prop-types';
import { Collapsible } from '@openedx/paragon';
import { Link } from 'react-router-dom';
var MobileMenu = function MobileMenu(_ref) {
  var mainMenuDropdowns = _ref.mainMenuDropdowns;
  return /*#__PURE__*/React.createElement("div", {
    className: "ml-4 p-2 bg-light-100 border border-gray-200 small rounded",
    "data-testid": "mobile-menu"
  }, /*#__PURE__*/React.createElement("div", null, mainMenuDropdowns.map(function (dropdown) {
    var id = dropdown.id,
      buttonTitle = dropdown.buttonTitle,
      items = dropdown.items;
    return /*#__PURE__*/React.createElement(Collapsible, {
      className: "border-light-100",
      title: buttonTitle,
      key: id
    }, /*#__PURE__*/React.createElement("ul", {
      className: "p-0",
      style: {
        listStyleType: 'none'
      }
    }, items.map(function (item) {
      return /*#__PURE__*/React.createElement("li", {
        className: "mobile-menu-item"
      }, /*#__PURE__*/React.createElement(Link, {
        to: item.href
      }, item.title));
    })));
  })));
};
MobileMenu.propTypes = {
  mainMenuDropdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    buttonTitle: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.node
    }))
  }))
};
MobileMenu.defaultProps = {
  mainMenuDropdowns: []
};
export default MobileMenu;
//# sourceMappingURL=MobileMenu.js.map