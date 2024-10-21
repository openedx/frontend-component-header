import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@openedx/paragon';

const LearningHeaderUserMenuItems = ({ items }) => items.map((item) => (
  <Dropdown.Item href={item.href}>
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
