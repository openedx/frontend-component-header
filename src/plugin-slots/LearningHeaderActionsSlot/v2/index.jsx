import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import HeaderNotificationsSlot from '../../HeaderNotificationsSlot';
import LearningHelpSlot from '../../LearningHelpSlot';

const LearningHeaderActionsSlot = ({ showDefaultActions = true }) => (
  <PluginSlot
    id="org.openedx.frontend.layout.learning_header_actions.v2"
    pluginProps={{ showDefaultActions }}
  >
    {showDefaultActions && (
      <>
        <HeaderNotificationsSlot />
        <LearningHelpSlot />
      </>
    )}
  </PluginSlot>
);

LearningHeaderActionsSlot.propTypes = {
  showDefaultActions: PropTypes.bool,
};

export default LearningHeaderActionsSlot;
