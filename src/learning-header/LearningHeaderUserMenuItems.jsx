import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@openedx/paragon';

const LearningHeaderUserMenuItems = ({
  items,
  handleKeyDown,
  firstMenuItemRef,
  lastMenuItemRef,
}) => {
  const getRefForIndex = (index, length) => {
    if (index === 0) { return firstMenuItemRef; }
    if (index === length - 1) { return lastMenuItemRef; }
    return null;
  };

  return items.map((item, index) => (
    <Dropdown.Item
      key={item.href}
      href={item.href}
      role="menuitem"
      onKeyDown={handleKeyDown}
      ref={getRefForIndex(index, items.length)}
    >
      {item.message}
    </Dropdown.Item>
  ));
};

export const learningHeaderUserMenuDataShape = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string,
  })),
};

LearningHeaderUserMenuItems.propTypes = learningHeaderUserMenuDataShape;

export default LearningHeaderUserMenuItems;
