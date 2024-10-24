import React from 'react';
import PropTypes from 'prop-types';
import { Hyperlink } from '@openedx/paragon';

import { navigateToUrl } from './utils';

const BrandNav = ({
  studioBaseUrl,
  logo,
  logoAltText,
  onNavigate,
}) => (
  <Hyperlink destination={studioBaseUrl} onClick={(e) => navigateToUrl(e, studioBaseUrl, onNavigate)}>
    <img
      src={logo}
      alt={logoAltText}
      className="d-block logo"
    />
  </Hyperlink>
);

BrandNav.propTypes = {
  studioBaseUrl: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  logoAltText: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default BrandNav;
