import React, { type FunctionComponent } from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import HeaderNotificationsSlot from '../HeaderNotificationsSlot';
import StudioHeaderSearchButtonSlot from '../StudioHeaderSearchButtonSlot';

interface StudioHeaderActionsSlotProps {
  searchButtonAction?: React.MouseEventHandler<HTMLButtonElement>;
}

const StudioHeaderActionsSlot: FunctionComponent<StudioHeaderActionsSlotProps> = ({
  searchButtonAction,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.studio_header_actions.v1"
    idAliases={['studio_header_actions_slot']}
  >
    <HeaderNotificationsSlot />
    <StudioHeaderSearchButtonSlot searchButtonAction={searchButtonAction} />
  </PluginSlot>
);

export default StudioHeaderActionsSlot;
