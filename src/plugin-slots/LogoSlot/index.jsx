import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import Logo, { logoDataShape } from '../../Logo';

const LogoSlot = ({
  href, src, alt, ...attributes
}) => (
  <PluginSlot
    id="logo_slot"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <Logo href={href} src={src} alt={alt} {...attributes} />
  </PluginSlot>
);

LogoSlot.propTypes = logoDataShape;

export default LogoSlot;
