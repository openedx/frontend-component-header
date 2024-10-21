import React from 'react';
import PropTypes from 'prop-types';

const MobileLoggedOutItems = ({ items }) => items.map(({ type, href, content }, i, arr) => (
  <li className="nav-item px-3 my-2" key={`${type}-${content}`}>
    <a
      className={i < arr.length - 1 ? 'btn btn-block btn-outline-primary' : 'btn btn-block btn-primary'}
      href={href}
    >
      {content}
    </a>
  </li>
));

export const mobileHeaderLoggedOutItemsDataShape = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.oneOf(['item', 'menu']),
  href: PropTypes.string,
  content: PropTypes.string,
}));

MobileLoggedOutItems.propTypes = {
  menu: mobileHeaderLoggedOutItemsDataShape,
};

export default MobileLoggedOutItems;
