import messages from './messages';
var getUserMenuItems = function getUserMenuItems(_ref) {
  var studioBaseUrl = _ref.studioBaseUrl,
    logoutUrl = _ref.logoutUrl,
    intl = _ref.intl,
    isAdmin = _ref.isAdmin;
  var items = [{
    href: "".concat(studioBaseUrl),
    title: intl.formatMessage(messages['header.user.menu.studio'])
  }, {
    href: "".concat(logoutUrl),
    title: intl.formatMessage(messages['header.user.menu.logout'])
  }];
  if (isAdmin) {
    items = [{
      href: "".concat(studioBaseUrl),
      title: intl.formatMessage(messages['header.user.menu.studio'])
    }, {
      href: "".concat(studioBaseUrl, "/maintenance"),
      title: intl.formatMessage(messages['header.user.menu.maintenance'])
    }, {
      href: "".concat(logoutUrl),
      title: intl.formatMessage(messages['header.user.menu.logout'])
    }];
  }
  return items;
};
export default getUserMenuItems;
//# sourceMappingURL=utils.js.map