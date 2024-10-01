import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownButton,
} from '@openedx/paragon';

const NavDropdownMenu = ({
  id,
  buttonTitle,
  items,
}) => (
  <DropdownButton
    id={id}
    title={buttonTitle}
    variant="outline-primary"
    className="mr-2"
  >
    {items.map(item => (
      <Dropdown.Item
        key={`${item.title}-dropdown-item`}
        href={item.href}
        className="small"
      >
        {item.title}
      </Dropdown.Item>
    ))}
  </DropdownButton>
);

NavDropdownMenu.propTypes = {
  id: PropTypes.string.isRequired,
  buttonTitle: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.node,
  })).isRequired,
};

export default NavDropdownMenu;
