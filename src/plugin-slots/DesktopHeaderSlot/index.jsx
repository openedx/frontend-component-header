import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopHeader, { desktopHeaderDataShape } from '../../desktop-header/DesktopHeader';

const DesktopHeaderSlot = ({
  props,
}) => (
  <PluginSlot
    id="desktop_header_slot"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <DesktopHeader {...props} />
  </PluginSlot>
);

DesktopHeaderSlot.propTypes = desktopHeaderDataShape;

export default DesktopHeaderSlot;
