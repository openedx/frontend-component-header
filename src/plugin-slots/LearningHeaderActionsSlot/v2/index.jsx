import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningHeaderActionsSlotV1 from '../v1';

const LearningHeaderActionsSlot = ({ showDefaultActions }) => (
  <PluginSlot
    id="org.openedx.frontend.layout.learning_header_actions.v2"
  >
    {showDefaultActions && <LearningHeaderActionsSlotV1 />}
  </PluginSlot>
);

LearningHeaderActionsSlot.propTypes = {
  showDefaultActions: PropTypes.bool,
};

LearningHeaderActionsSlot.defaultProps = {
  showDefaultActions: true,
};

export default LearningHeaderActionsSlot;
