import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileHeader, { mobileHeaderDataShape } from '../../mobile-header/MobileHeader';

const MobileHeaderSlot = ({
  props,
}) => (
  <PluginSlot
    id="mobile_header_slot"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <MobileHeader {...props} />
  </PluginSlot>
);

MobileHeaderSlot.propTypes = mobileHeaderDataShape;

export default MobileHeaderSlot;
