import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BrandNav = ({
  studioBaseUrl,
  logo,
  logoAltText,
}) => (
  <Link to={studioBaseUrl}>
    <img
      src={logo}
      alt={logoAltText}
      className="d-block logo"
    />
  </Link>
);

BrandNav.propTypes = {
  studioBaseUrl: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  logoAltText: PropTypes.string.isRequired,
};

export default BrandNav;
