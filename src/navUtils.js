export const normalizePath = (path) => {
  if (!path || path === '/') {
    return '/';
  }
  return path.replace(/\/$/, '');
};

export const getLinkPath = (url) => {
  if (!url) {
    return '';
  }
  return url.startsWith('http') ? new URL(url).pathname : url;
};

export const isSearchCatalogLink = (url, searchCatalogUrl) => {
  if (!searchCatalogUrl || !url) {
    return false;
  }
  return normalizePath(getLinkPath(url)) === normalizePath(getLinkPath(searchCatalogUrl));
};
