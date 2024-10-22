import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningLoggedOutButtons, { learningHeaderLoggedOutItemsDataShape } from '../../learning-header/LearningLoggedOutButtons';

const LearningLoggedOutItemsSlot = ({
  buttonsInfo,
}) => (
  <PluginSlot
    id="learning_logged_out_items_slot"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <LearningLoggedOutButtons buttonsInfo={buttonsInfo} />
  </PluginSlot>
);

LearningLoggedOutItemsSlot.propTypes = learningHeaderLoggedOutItemsDataShape;

export default LearningLoggedOutItemsSlot;
