import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningHeaderUserMenuItems, { learningHeaderUserMenuDataShape } from '../../learning-header/LearningHeaderUserMenuItems';
var LearningUserMenuSlot = function LearningUserMenuSlot(_ref) {
  var items = _ref.items;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "learning_user_menu_slot",
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(LearningHeaderUserMenuItems, {
    items: items
  }));
};
LearningUserMenuSlot.propTypes = learningHeaderUserMenuDataShape;
export default LearningUserMenuSlot;
//# sourceMappingURL=index.js.map