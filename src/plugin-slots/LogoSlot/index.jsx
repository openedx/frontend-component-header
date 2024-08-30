import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import Logo from '../../Logo';

const LogoSlot = ({ href, src, alt }) => (
  <PluginSlot id="logo_slot">
    <Logo content={{ href, src, alt }} />
  </PluginSlot>
);

LogoSlot.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default LogoSlot;
