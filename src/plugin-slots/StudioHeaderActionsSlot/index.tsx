import React, { type FunctionComponent } from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import HeaderNotificationsSlot from '../HeaderNotificationsSlot';
import StudioHeaderSearchButtonSlot from '../StudioHeaderSearchButtonSlot';

interface StudioHeaderActionsSlotProps {
  searchButtonAction?: React.MouseEventHandler<HTMLButtonElement>;
}

export const StudioHeaderActionsSlotV1: FunctionComponent<StudioHeaderActionsSlotProps> = ({
  searchButtonAction,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.studio_header_actions.v1"
  >
    <StudioHeaderSearchButtonSlot searchButtonAction={searchButtonAction} />
  </PluginSlot>
);

const StudioHeaderActionsSlot: FunctionComponent<StudioHeaderActionsSlotProps> = ({
  searchButtonAction,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.studio_header_actions.v2"
    pluginProps={{ searchButtonAction }}
  >
    <HeaderNotificationsSlot />
    <StudioHeaderActionsSlotV1 searchButtonAction={searchButtonAction} />
  </PluginSlot>
);

export default StudioHeaderActionsSlot;
