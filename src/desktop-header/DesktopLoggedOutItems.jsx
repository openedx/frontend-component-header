import React from 'react';
import PropTypes from 'prop-types';

const DesktopLoggedOutItems = ({ items }) => items.map((item, i, arr) => (
  <a
    key={`${item.type}-${item.content}`}
    className={i < arr.length - 1 ? 'btn mr-2 btn-link' : 'btn mr-2 btn-outline-primary'}
    href={item.href}
  >
    {item.content}
  </a>
));

export const desktopLoggedOutItemsDataShape = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.oneOf(['item', 'menu']),
  href: PropTypes.string,
  content: PropTypes.string,
}));

DesktopLoggedOutItems.propTypes = {
  items: desktopLoggedOutItemsDataShape,
};

export default DesktopLoggedOutItems;
