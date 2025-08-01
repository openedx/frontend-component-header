import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningUserMenuToggle, {
  LearningUserMenuTogglePropTypes,
} from '../../learning-header/LearningUserMenuToggle';

const LearningUserMenuToggleSlot = ({
  label, icon,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_learning_user_menu_toggle.v1"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <LearningUserMenuToggle label={label} icon={icon} />
  </PluginSlot>
);

LearningUserMenuToggleSlot.propTypes = LearningUserMenuTogglePropTypes;

export default LearningUserMenuToggleSlot;
