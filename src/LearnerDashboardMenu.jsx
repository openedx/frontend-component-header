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
import { getLinkPath, isSearchCatalogLink, normalizePath } from './navUtils';

// Icon map — allows HEADER_NAV_LINKS to reference icons by string name
const ICON_MAP = {
  Home: IconHome,
  LibraryBooks: IconBook,
  ClockHour3: IconClockHour3,
  Search: IconSearch,
  HelpHexagon: IconHelpHexagon,
};

// Icon + label rendered as direct children of .nav-link (matches LMS .lw-nav-item)
const NavItem = ({ icon: IconComponent, label }) => (
  <>
    <IconComponent size={18} className="lw-nav-icon" aria-hidden="true" />
    <span>{label}</span>
  </>
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

  // /dashboard redirects into learner-dashboard MFE; search catalog URL into search MFE.
  const isLinkActive = (link) => {
    if (link.url === '/dashboard' || link.url.endsWith('/dashboard')) {
      return getConfig().APP_ID === 'learner-dashboard';
    }
    if (isSearchCatalogLink(link.url, searchCatalogUrl)) {
      return getConfig().APP_ID === 'search';
    }
    return normalizePath(window.location.pathname) === normalizePath(getLinkPath(link.url));
  };

  const mainMenu = configNavLinks
    ? configNavLinks.map((link) => {
      const active = isLinkActive(link);
      return {
        type: 'item',
        href: link.url.startsWith('http') ? link.url : `${BASE_URL}${link.url}`,
        isActive: active,
        // Skip navigation when already on this page (avoids /dashboard redirect flicker)
        onClick: active ? (e) => e.preventDefault() : undefined,
        content: (
          <NavItem
            icon={ICON_MAP[link.icon] ?? IconHome}
            label={link.title}
          />
        ),
      };
    })
    : (() => {
      const coursesActive = getConfig().APP_ID === 'learner-dashboard';
      const discoverActive = getConfig().APP_ID === 'search';
      return [
        {
          type: 'item',
          href: `${BASE_URL}/dashboard`,
          content: formatMessage(messages['header.links.courses']),
          isActive: coursesActive,
          onClick: coursesActive ? (e) => e.preventDefault() : undefined,
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
          isActive: discoverActive,
          onClick: (e) => {
            if (discoverActive) {
              e.preventDefault();
              return;
            }
            if (exploreCoursesClick) {
              exploreCoursesClick(e);
            }
          },
        }] : []),
      ];
    })();

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
