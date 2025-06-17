import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import Logo, { logoDataShape } from '../../Logo';

const LogoSlot = ({
  href, src, alt, ...attributes
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_logo.v1"
    idAliases={['logo_slot']}
    slotOptions={{
      mergeProps: true,
    }}
    props={{
      href, src, alt, attributes,
    }}
  >
    <Logo href={href} src={src} alt={alt} {...attributes} />
  </PluginSlot>
);

LogoSlot.propTypes = logoDataShape;

export default LogoSlot;
