import React, { type ReactNode } from 'react';
import {
  Dropdown,
  DropdownButton,
} from '@openedx/paragon';
import { Link } from 'react-router-dom';

import { getItemLinkProps } from './utils';

/** A link in a header menu. Shared by the desktop dropdowns and the mobile menu. */
export interface NavDropdownMenuItem {
  title: ReactNode;
  href: string;
  /** Where to open the link, e.g. `_blank` for a new tab. Omit to open it in the current tab. */
  target?: React.HTMLAttributeAnchorTarget;
  /** Defaults to `noopener noreferrer` when `target` is `_blank`; set it to override. */
  rel?: string;
}

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
