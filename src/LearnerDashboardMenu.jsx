import React from 'react';
import {
  IconHome,
  IconBook,
  IconClockHour3,
  IconSearch,
  IconHelpHexagon,
  IconBell,
} from '@tabler/icons-react';
import { getConfig } from '@edx/frontend-platform';

import messages from './Header.messages';

// Icon map — allows HEADER_NAV_LINKS to reference icons by string name
const ICON_MAP = {
  Home: IconHome,
  LibraryBooks: IconBook,
  ClockHour3: IconClockHour3,
  Search: IconSearch,
  HelpHexagon: IconHelpHexagon,
};

// Icon + label rendered inside each nav-link
const NavItem = ({ icon: IconComponent, label }) => (
  <span className="d-inline-flex align-items-center lw-nav-item">
    <IconComponent size={18} className="lw-nav-icon" />
    <span>{label}</span>
  </span>
);

const getLearnerHeaderMenu = (
  formatMessage,
  courseSearchUrl,
  authenticatedUser,
  exploreCoursesClick,
) => {
  const BASE_URL = getConfig().LMS_BASE_URL;
  const toLmsUrl = (url) => (
    !url || url.startsWith('http') ? url : `${BASE_URL}${url}`
  );
  const searchCatalogUrl = getConfig().SEARCH_CATALOG_URL;

  // ─────────────────────────────────────────────────────────────────────────
  // Read nav links from MFE_CONFIG (set once in openlms_brand.py).
  // Each entry: { title, url, icon? }
  // Falls back to the original hardcoded links if HEADER_NAV_LINKS is unset.
  // ─────────────────────────────────────────────────────────────────────────
  const configNavLinks = getConfig().HEADER_NAV_LINKS;

  // Determine if a nav link should be marked active.
  // Dashboard redirects from /dashboard → apps.*/learner-dashboard, so we
  // match by APP_ID instead of URL. All other links compare by pathname.
  const isLinkActive = (link) => {
    if (link.url === '/dashboard' || link.url.endsWith('/dashboard')) {
      return getConfig().APP_ID === 'learner-dashboard';
    }
    const linkPath = link.url.startsWith('http')
      ? new URL(link.url).pathname
      : link.url;
    return window.location.pathname === linkPath;
  };

  const mainMenu = configNavLinks
    ? configNavLinks.map((link) => ({
      type: 'item',
      href: link.url.startsWith('http') ? link.url : `${BASE_URL}${link.url}`,
      isActive: isLinkActive(link),
      content: (
        <NavItem
          icon={ICON_MAP[link.icon] ?? IconHome}
          label={link.title}
        />
      ),
    }))
    : [
      {
        type: 'item',
        href: `${BASE_URL}/dashboard`,
        content: formatMessage(messages['header.links.courses']),
        isActive: true,
      },
      ...(getConfig().ENABLE_PROGRAMS ? [{
        type: 'item',
        href: `${BASE_URL}/dashboard/programs`,
        content: formatMessage(messages['header.links.programs']),
      }] : []),
      ...(!getConfig().NON_BROWSABLE_COURSES && courseSearchUrl ? [{
        type: 'item',
        href: courseSearchUrl,
        content: formatMessage(messages['header.links.content.search']),
        onClick: (e) => {
          if (exploreCoursesClick) { exploreCoursesClick(e); }
        },
      }] : []),
    ];

  const searchItem = searchCatalogUrl ? [{
    type: 'item',
    href: null,
    className: 'lw-search-item',
    content: (
      <div className="lw-search-wrapper">
        <IconSearch size={16} className="lw-search-icon" />
        <input
          className="lw-search-input"
          type="search"
          aria-label={formatMessage(messages['header.search.placeholder'])}
          placeholder={formatMessage(messages['header.search.placeholder'])}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const q = e.target.value.trim();
              window.location.href = toLmsUrl(searchCatalogUrl)
                + (q ? `?q=${encodeURIComponent(q)}` : '');
            }
          }}
        />
      </div>
    ),
  }] : [];

  return {
    mainMenu: [...mainMenu, ...searchItem],
    secondaryMenu: (
      <button className="lw-notification-btn" aria-label="Notifications">
        <IconBell size={24} />
      </button>
    ),  
    userMenu: [
      {
        heading: '',
        items: [
          {
            type: 'item',
            href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${authenticatedUser?.username}`,
            content: formatMessage(messages['header.user.menu.profile']),
          },
          {
            type: 'item',
            href: `${getConfig().ACCOUNT_SETTINGS_URL}`,
            content: formatMessage(messages['header.user.menu.account.settings']),
          },
          ...(getConfig().ORDER_HISTORY_URL ? [{
            type: 'item',
            href: getConfig().ORDER_HISTORY_URL,
            content: formatMessage(messages['header.user.menu.order.history']),
          }] : []),
        ],
      },
      {
        heading: '',
        items: [
          {
            type: 'item',
            href: `${getConfig().LOGOUT_URL}`,
            content: formatMessage(messages['header.user.menu.logout']),
          },
        ],
      },
    ],
  };
};

export default getLearnerHeaderMenu;
