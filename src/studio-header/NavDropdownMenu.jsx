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
  onNavigate,
}) => {
  const handleClick = (url) => {
    const isAbsoluteUrl = /^https?:\/\//i.test(url);

    if (isAbsoluteUrl) {
      window.location.href = url;
    } else if (onNavigate) {
      onNavigate(`${url}`);
    }
  };

  return (
    <DropdownButton
      id={id}
      title={buttonTitle}
      variant="outline-primary"
      className="mr-2"
    >
      {items.map(item => (
        <Dropdown.Item
          key={`${item.title}-dropdown-item`}
          onClick={() => handleClick(item.href)}
          className="small"
          href={item.href.startsWith('#') ? item.href : null}
        >
          {item.title}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

NavDropdownMenu.propTypes = {
  id: PropTypes.string.isRequired,
  buttonTitle: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
  })).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default NavDropdownMenu;
