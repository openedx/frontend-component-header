import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import HeaderNotificationsSlot from '../HeaderNotificationsSlot';
import LearningHelpSlot from '../LearningHelpSlot';

const LearningHeaderActionsSlot = ({ showUserDropdown }) => (
  <PluginSlot
    id="org.openedx.frontend.layout.learning_header_actions.v2"
  >
    {showUserDropdown && (
      <PluginSlot
        id="org.openedx.frontend.layout.learning_header_actions.v1"
      >
        <HeaderNotificationsSlot />
        <LearningHelpSlot />
      </PluginSlot>
    )}
  </PluginSlot>
);

LearningHeaderActionsSlot.propTypes = {
  showUserDropdown: PropTypes.bool,
};

LearningHeaderActionsSlot.defaultProps = {
  showUserDropdown: true,
};

export default LearningHeaderActionsSlot;
