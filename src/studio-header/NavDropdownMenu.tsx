import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownButton,
} from '@openedx/paragon';
import { Link } from 'react-router-dom';

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
        as={Link}
        key={`${item.title}-dropdown-item`}
        to={item.href}
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
    href: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
  })).isRequired,
};

export default NavDropdownMenu;
