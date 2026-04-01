import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import HeaderNotificationsSlot from '../HeaderNotificationsSlot';
import LearningHelpSlot from '../LearningHelpSlot';

export const LearningHeaderActionsSlotV1 = () => (
  <PluginSlot
    id="org.openedx.frontend.layout.learning_header_actions.v1"
  >
    <LearningHelpSlot />
  </PluginSlot>
);

const LearningHeaderActionsSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.layout.learning_header_actions.v2"
  >
    <HeaderNotificationsSlot />
    <LearningHeaderActionsSlotV1 />
  </PluginSlot>
);

export default LearningHeaderActionsSlot;
