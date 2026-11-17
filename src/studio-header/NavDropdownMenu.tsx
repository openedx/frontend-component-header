import React, { type ReactNode } from 'react';
import {
  Dropdown,
  DropdownButton,
} from '@openedx/paragon';
import { Link } from 'react-router-dom';

import type { NavDropdownMenuItem } from './HeaderBody';
import { getItemLinkProps } from './utils';

interface Props {
  id: string;
  buttonTitle: ReactNode;
  items: NavDropdownMenuItem[];
}

const NavDropdownMenu = ({
  id,
  buttonTitle,
  items,
}: Props) => (
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
        {...getItemLinkProps(item)}
        className="small"
      >
        {item.title}
      </Dropdown.Item>
    ))}
  </DropdownButton>
);

export default NavDropdownMenu;
