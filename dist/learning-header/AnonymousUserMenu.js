import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import LearningLoggedOutItemsSlot from '../plugin-slots/LearningLoggedOutItemsSlot';
import genericMessages from '../generic/messages';
var AnonymousUserMenu = function AnonymousUserMenu(_ref) {
  var intl = _ref.intl;
  var buttonsInfo = [{
    message: intl.formatMessage(genericMessages.registerSentenceCase),
    href: "".concat(getConfig().LMS_BASE_URL, "/register?next=").concat(encodeURIComponent(global.location.href))
  }, {
    message: intl.formatMessage(genericMessages.signInSentenceCase),
    href: getLoginRedirectUrl(global.location.href),
    variant: 'primary'
  }];
  return /*#__PURE__*/React.createElement(LearningLoggedOutItemsSlot, {
    buttonsInfo: buttonsInfo
  });
};
AnonymousUserMenu.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(AnonymousUserMenu);
//# sourceMappingURL=AnonymousUserMenu.js.map