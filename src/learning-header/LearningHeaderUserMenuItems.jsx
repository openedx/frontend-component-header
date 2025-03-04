import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@openedx/paragon';

const LearningHeaderUserMenuItems = ({
  items,
  handleKeyDown,
  firstMenuItemRef,
  lastMenuItemRef,
}) => items.map((item, index) => (
  <Dropdown.Item
    href={item.href}
    role="menuitem"
    onKeyDown={handleKeyDown}
    // eslint-disable-next-line no-nested-ternary
    ref={index === 0 ? firstMenuItemRef : index === items.length - 1 ? lastMenuItemRef : null}
  >
    {item.message}
  </Dropdown.Item>
));

export const learningHeaderUserMenuDataShape = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string,
  })),
};

LearningHeaderUserMenuItems.propTypes = learningHeaderUserMenuDataShape;

export default LearningHeaderUserMenuItems;
