import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningLoggedOutButtons, { learningHeaderLoggedOutItemsDataShape } from '../../learning-header/LearningLoggedOutButtons';

const LearningLoggedOutItemsSlot = ({
  buttonsInfo,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_learning_logged_out_items.v1"
    idAliases={['learning_logged_out_items_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <LearningLoggedOutButtons buttonsInfo={buttonsInfo} />
  </PluginSlot>
);

LearningLoggedOutItemsSlot.propTypes = learningHeaderLoggedOutItemsDataShape;

export default LearningLoggedOutItemsSlot;
