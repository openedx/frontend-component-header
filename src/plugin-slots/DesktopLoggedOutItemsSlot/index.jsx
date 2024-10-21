import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopLoggedOutItems, { desktopLoggedOutItemsDataShape } from '../../desktop-header/DesktopLoggedOutItems';

const DesktopLoggedOutItemsSlot = ({
  items,
}) => (
  <PluginSlot
    id="desktop_logged_out_items_slot"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <DesktopLoggedOutItems items={items} />
  </PluginSlot>
);

DesktopLoggedOutItemsSlot.propTypes = {
  items: desktopLoggedOutItemsDataShape,
};

export default DesktopLoggedOutItemsSlot;
