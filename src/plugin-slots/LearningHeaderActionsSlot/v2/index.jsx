import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningHeaderActionsSlotV1 from '../v1';

const LearningHeaderActionsSlot = ({ showDefaultActions = true }) => (
  <PluginSlot
    id="org.openedx.frontend.layout.learning_header_actions.v2"
    pluginProps={{ showDefaultActions }}
  >
    {showDefaultActions && <LearningHeaderActionsSlotV1 />}
  </PluginSlot>
);

LearningHeaderActionsSlot.propTypes = {
  showDefaultActions: PropTypes.bool,
};

export default LearningHeaderActionsSlot;
