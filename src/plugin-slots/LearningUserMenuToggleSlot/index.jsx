import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningUserMenuToggle, {
  LearningUserMenuTogglePropTypes,
} from '../../learning-header/LearningUserMenuToggle';

const LearningUserMenuToggleSlot = ({
  username, icon,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_learning_user_menu_toggle.v1"
    idAliases={['learning_user_menu_toggle_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <LearningUserMenuToggle username={username} icon={icon} />
  </PluginSlot>
);

LearningUserMenuToggleSlot.propTypes = LearningUserMenuTogglePropTypes;

export default LearningUserMenuToggleSlot;
