import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@openedx/paragon';
var LearningLoggedOutButtons = function LearningLoggedOutButtons(_ref) {
  var buttonsInfo = _ref.buttonsInfo;
  return buttonsInfo.map(function (buttonInfo) {
    var _buttonInfo$variant;
    return /*#__PURE__*/React.createElement(Button, {
      className: "ml-3",
      variant: (_buttonInfo$variant = buttonInfo.variant) !== null && _buttonInfo$variant !== void 0 ? _buttonInfo$variant : 'outline-primary',
      href: buttonInfo.href
    }, buttonInfo.message);
  });
};
export var learningHeaderLoggedOutItemsDataShape = {
  buttonsInfo: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string,
    variant: PropTypes.string
  }))
};
LearningLoggedOutButtons.propTypes = learningHeaderLoggedOutItemsDataShape;
export default LearningLoggedOutButtons;
//# sourceMappingURL=LearningLoggedOutButtons.js.map