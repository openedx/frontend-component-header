import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningHeaderUserMenuItems, { learningHeaderUserMenuDataShape } from '../../learning-header/LearningHeaderUserMenuItems';

const LearningUserMenuSlot = ({
  items,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_learning_user_menu.v1"
    idAliases={['learning_user_menu_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <LearningHeaderUserMenuItems items={items} />
  </PluginSlot>
);

LearningUserMenuSlot.propTypes = learningHeaderUserMenuDataShape;

export default LearningUserMenuSlot;
