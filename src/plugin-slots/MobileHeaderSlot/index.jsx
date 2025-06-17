import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileHeader, { mobileHeaderDataShape } from '../../mobile-header/MobileHeader';

const MobileHeaderSlot = ({
  props,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_mobile.v1"
    idAliases={['mobile_header_slot']}
    slotOptions={{
      mergeProps: true,
    }}
    pluginProps={props}
  >
    <MobileHeader {...props} />
  </PluginSlot>
);

MobileHeaderSlot.propTypes = mobileHeaderDataShape;

export default MobileHeaderSlot;
