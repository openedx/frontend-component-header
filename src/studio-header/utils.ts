import messages from './messages';
import type { NavDropdownMenuItem } from './NavDropdownMenu';

const getUserMenuItems = ({
  studioBaseUrl,
  logoutUrl,
  intl,
  isAdmin,
}) => {
  let items = [
    {
      href: `${studioBaseUrl}`,
      title: intl.formatMessage(messages['header.user.menu.studio']),
    }, {
      href: `${logoutUrl}`,
      title: intl.formatMessage(messages['header.user.menu.logout']),
    },
  ];
  if (isAdmin) {
    items = [
      {
        href: `${studioBaseUrl}`,
        title: intl.formatMessage(messages['header.user.menu.studio']),
      }, {
        href: `${logoutUrl}`,
        title: intl.formatMessage(messages['header.user.menu.logout']),
      },
    ];
  }

  return items;
};

export default getUserMenuItems;

/**
 * Returns the `target`/`rel` attributes for a menu item link. NavDropdownMenu and MobileMenu
 * both render the same items, so the safe `rel` default for `_blank` lives here to keep the
 * desktop and mobile menus behaving the same.
 */
export const getItemLinkProps = ({ target, rel }: Pick<NavDropdownMenuItem, 'target' | 'rel'>) => ({
  target,
  rel: rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined),
});
