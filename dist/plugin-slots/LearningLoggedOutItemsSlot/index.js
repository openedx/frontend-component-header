import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningLoggedOutButtons, { learningHeaderLoggedOutItemsDataShape } from '../../learning-header/LearningLoggedOutButtons';
var LearningLoggedOutItemsSlot = function LearningLoggedOutItemsSlot(_ref) {
  var buttonsInfo = _ref.buttonsInfo;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "learning_logged_out_items_slot",
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(LearningLoggedOutButtons, {
    buttonsInfo: buttonsInfo
  }));
};
LearningLoggedOutItemsSlot.propTypes = learningHeaderLoggedOutItemsDataShape;
export default LearningLoggedOutItemsSlot;
//# sourceMappingURL=index.js.map