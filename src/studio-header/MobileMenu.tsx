import React from 'react';
import { Collapsible } from '@openedx/paragon';
import { Link } from 'react-router-dom';

import type { HeaderBodyProps } from './HeaderBody';
import { getItemLinkProps } from './utils';

type Props = Pick<HeaderBodyProps, 'mainMenuDropdowns'>;

const MobileMenu = ({ mainMenuDropdowns = [] }: Props) => (
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
                  <Link to={item.href} {...getItemLinkProps(item)}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Collapsible>
        );
      })}
    </div>
  </div>
);

export default MobileMenu;
