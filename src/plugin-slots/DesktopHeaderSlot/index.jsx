import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopHeader, { desktopHeaderDataShape } from '../../desktop-header/DesktopHeader';

const DesktopHeaderSlot = ({
  props,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_desktop.v1"
    idAliases={['desktop_header_slot']}
    slotOptions={{
      mergeProps: true,
    }}
    pluginProps={props}
  >
    <DesktopHeader {...props} />
  </PluginSlot>
);

DesktopHeaderSlot.propTypes = desktopHeaderDataShape;

export default DesktopHeaderSlot;
