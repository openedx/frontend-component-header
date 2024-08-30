import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import Logo from '../../Logo';

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

LogoSlot.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default LogoSlot;
