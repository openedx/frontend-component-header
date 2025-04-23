import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileLoggedOutItems, { mobileHeaderLoggedOutItemsDataShape } from '../../mobile-header/MobileLoggedOutItems';

const MobileLoggedOutItemsSlot = ({
  items,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_mobile_logged_out_items.v1"
    idAliases={['mobile_logged_out_items_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <MobileLoggedOutItems items={items} />
  </PluginSlot>
);

MobileLoggedOutItemsSlot.propTypes = {
  items: mobileHeaderLoggedOutItemsDataShape,
};

export default MobileLoggedOutItemsSlot;
