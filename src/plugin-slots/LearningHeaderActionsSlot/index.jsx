import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import HeaderNotificationsSlot from '../HeaderNotificationsSlot';
import LearningHelpSlot from '../LearningHelpSlot';

const LearningHeaderActionsSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.layout.learning_header_actions.v1"
    idAliases={['learning_header_actions_slot']}
  >
    <HeaderNotificationsSlot />
    <LearningHelpSlot />
  </PluginSlot>
);

export default LearningHeaderActionsSlot;
