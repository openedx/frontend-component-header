import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
var LearningHeaderHelpLink = function LearningHeaderHelpLink() {
  var intl = useIntl();
  return /*#__PURE__*/React.createElement("a", {
    className: "text-gray-700",
    href: "".concat(getConfig().SUPPORT_URL)
  }, intl.formatMessage(messages.help));
};
export default LearningHeaderHelpLink;
//# sourceMappingURL=LearningHeaderHelpLink.js.map