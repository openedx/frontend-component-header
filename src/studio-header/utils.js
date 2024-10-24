import { getConfig } from '@edx/frontend-platform';
import messages from './messages';

/**
 * Handles the navigation to a specified URL. Prevents the default event behavior
 * and either navigates to an absolute URL or calls the provided `onNavigate` function for relative URLs.
 *
 * @param {Event} e - The event object from the click handler.
 * @param {string} url - The URL to navigate to. Can be an absolute or relative URL.
 * @param {function} [onNavigate] - A callback function that is called when the URL is not absolute.
 *                                   This is used for handling navigation within the application.
 */
export const navigateToUrl = (e, url, onNavigate) => {
  e.preventDefault();

  if (typeof url !== 'string' || !url.trim()) {
    return;
  }

  const isAbsoluteUrl = /^https?:\/\//i.test(url);

  if (isAbsoluteUrl) {
    window.location.href = url;
  } else if (typeof onNavigate === 'function') {
    onNavigate(url);
  }
};

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
        href: `${getConfig().STUDIO_BASE_URL}/maintenance`,
        title: intl.formatMessage(messages['header.user.menu.maintenance']),
      }, {
        href: `${logoutUrl}`,
        title: intl.formatMessage(messages['header.user.menu.logout']),
      },
    ];
  }

  return items;
};

export default getUserMenuItems;
