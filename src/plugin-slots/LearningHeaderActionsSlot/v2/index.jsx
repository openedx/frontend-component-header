import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningHeaderActionsSlotV1 from '../v1';

const LearningHeaderActionsSlot = ({ showUserDropdown }) => (
  <PluginSlot
    id="org.openedx.frontend.layout.learning_header_actions.v2"
  >
    {showUserDropdown && <LearningHeaderActionsSlotV1 />}
  </PluginSlot>
);

LearningHeaderActionsSlot.propTypes = {
  showUserDropdown: PropTypes.bool,
};

LearningHeaderActionsSlot.defaultProps = {
  showUserDropdown: true,
};

export default LearningHeaderActionsSlot;
