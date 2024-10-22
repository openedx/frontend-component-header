import React from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuTrigger, MenuContent } from '../Menu';
import { CaretIcon } from '../Icons';

const DesktopHeaderMainOrSecondaryMenu = ({ menu }) => {
  // Nodes are accepted as a prop
  if (!Array.isArray(menu)) {
    return menu;
  }

  return menu.map((menuItem) => {
    const {
      type,
      href,
      content,
      submenuContent,
      disabled,
      isActive,
      onClick,
    } = menuItem;

    if (type === 'item') {
      return (
        <a
          key={`${type}-${content}`}
          className={`nav-link${disabled ? ' disabled' : ''}${isActive ? ' active' : ''}`}
          href={href}
          onClick={onClick || null}
        >
          {content}
        </a>
      );
    }

    return (
      <Menu key={`${type}-${content}`} tag="div" className="nav-item" respondToPointerEvents>
        <MenuTrigger onClick={onClick || null} tag="a" className="nav-link d-inline-flex align-items-center" href={href}>
          {content} <CaretIcon role="img" aria-hidden focusable="false" />
        </MenuTrigger>
        <MenuContent className="pin-left pin-right shadow py-2">
          {submenuContent}
        </MenuContent>
      </Menu>
    );
  });
};

export const desktopHeaderMainOrSecondaryMenuDataShape = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.array,
]);

DesktopHeaderMainOrSecondaryMenu.propTypes = {
  menu: desktopHeaderMainOrSecondaryMenuDataShape,
};

export default DesktopHeaderMainOrSecondaryMenu;
