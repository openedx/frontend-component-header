import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import HeaderNotificationsSlot from '../../HeaderNotificationsSlot';
import LearningHelpSlot from '../../LearningHelpSlot';

/** @deprecated Use `LearningHeaderActionsSlotV2` instead. See DEPR ticket openedx/frontend-component-header#681. */
const LearningHeaderActionsSlotV1 = () => {
  // eslint-disable-next-line no-console
  console.warn(
    '[DEPRECATED] The "org.openedx.frontend.layout.learning_header_actions.v1" plugin slot '
    + 'is deprecated and will be removed. Migrate your pluginSlots config to '
    + '"org.openedx.frontend.layout.learning_header_actions.v2". '
    + 'See https://github.com/openedx/frontend-component-header/issues/681 for details.',
  );

  return (
    <PluginSlot
      id="org.openedx.frontend.layout.learning_header_actions.v1"
    >
      <HeaderNotificationsSlot />
      <LearningHelpSlot />
    </PluginSlot>
  );
};

export default LearningHeaderActionsSlotV1;
