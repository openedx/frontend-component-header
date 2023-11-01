import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useResolvedPath } from 'react-router-dom';

import {
  Dropdown,
  DropdownButton,
} from '@edx/paragon';

const NavDropdownItem = ({ item }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(item.href);

  return (
    <Dropdown.Item
      href={resolvedPath.pathname}
      onClick={(e) => { e.preventDefault(); navigate(resolvedPath.pathname); }}
      className="small"
    >
      {item.title}
    </Dropdown.Item>
  );
};

NavDropdownItem.propTypes = {
  item: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

const NavDropdownMenu = ({
  id,
  buttonTitle,
  items,
}) => (
  <DropdownButton
    id={id}
    title={buttonTitle}
    variant="tertiary"
  >
    {items.map(item => (/^(?:\w+:)?\/\//.test(item.href)
      ? (
        <Dropdown.Item
          href={item.href}
          className="small"
        >
          {item.title}
        </Dropdown.Item>
      )
      : <NavDropdownItem item={item} />))}
  </DropdownButton>
);

NavDropdownMenu.propTypes = {
  id: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
};

export default NavDropdownMenu;
