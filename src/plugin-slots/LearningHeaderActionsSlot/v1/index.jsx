import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import HeaderNotificationsSlot from '../../HeaderNotificationsSlot';
import LearningHelpSlot from '../../LearningHelpSlot';

const SLOT_ID = 'org.openedx.frontend.layout.learning_header_actions.v1';

let hasWarned = false;

/** @deprecated Use `LearningHeaderActionsSlotV2` instead. See DEPR ticket openedx/frontend-component-header#681. */
const LearningHeaderActionsSlotV1 = () => {
  if (!hasWarned && getConfig()?.pluginSlots?.[SLOT_ID]) {
    hasWarned = true;
    // eslint-disable-next-line no-console
    console.warn(
      `[Deprecated] The "${SLOT_ID}" plugin slot `
      + 'is deprecated and will be removed. Migrate your pluginSlots config to '
      + '"org.openedx.frontend.layout.learning_header_actions.v2". '
      + 'See https://github.com/openedx/frontend-component-header/issues/681 for details.',
    );
  }

  return (
    <PluginSlot
      id={SLOT_ID}
    >
      <HeaderNotificationsSlot />
      <LearningHelpSlot />
    </PluginSlot>
  );
};

export default LearningHeaderActionsSlotV1;
