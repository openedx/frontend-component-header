import React from 'react';
import PropTypes from 'prop-types';

const DesktopHeaderUserMenu = ({ menu }) => menu.map((group, index) => (
  // eslint-disable-next-line react/jsx-no-comment-textnodes,react/no-array-index-key
  <React.Fragment key={index}>
    {group.heading && <div className="dropdown-header" role="heading" aria-level="1">{group.heading}</div>}
    {group.items.map(({
      type, content, href, disabled, isActive, onClick,
    }) => (
      <a
        className={`dropdown-${type}${isActive ? ' active' : ''}${disabled ? ' disabled' : ''}`}
        key={`${type}-${content}`}
        href={href}
        onClick={onClick || null}
      >
        {content}
      </a>
    ))}
    {index < menu.length - 1 && <div className="dropdown-divider" role="separator" />}
  </React.Fragment>
));

export const desktopUserMenuDataShape = PropTypes.arrayOf(PropTypes.shape({
  heading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
  })),
}));

DesktopHeaderUserMenu.propTypes = {
  menu: desktopUserMenuDataShape,
};

export default DesktopHeaderUserMenu;
