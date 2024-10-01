import React from 'react';
import PropTypes from 'prop-types';
import { Collapsible } from '@openedx/paragon';

const MobileMenu = ({
  mainMenuDropdowns,
}) => (
  <div
    className="ml-4 p-2 bg-light-100 border border-gray-200 small rounded"
    data-testid="mobile-menu"
  >
    <div>
      {mainMenuDropdowns.map(dropdown => {
        const { id, buttonTitle, items } = dropdown;
        return (
          <Collapsible
            className="border-light-100"
            title={buttonTitle}
            key={id}
          >
            <ul className="p-0" style={{ listStyleType: 'none' }}>
              {items.map(item => (
                <li className="mobile-menu-item">
                  <a href={item.href}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </Collapsible>
        );
      })}
    </div>
  </div>
);

MobileMenu.propTypes = {
  mainMenuDropdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    buttonTitle: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.node,
    })),
  })),
};
MobileMenu.defaultProps = {
  mainMenuDropdowns: [],
};

export default MobileMenu;
