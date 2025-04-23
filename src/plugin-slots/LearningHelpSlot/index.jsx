import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningHeaderHelpLink from '../../learning-header/LearningHeaderHelpLink';

const LearningHelpSlot = () => (
  <PluginSlot id="org.openedx.frontend.layout.header_learning_help.v1" idAliases={['learning_help_slot']}>
    <LearningHeaderHelpLink />
  </PluginSlot>
);

export default LearningHelpSlot;
