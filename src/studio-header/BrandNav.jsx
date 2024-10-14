import React from 'react';
import PropTypes from 'prop-types';
import { Hyperlink } from '@openedx/paragon';

const BrandNav = ({
  studioBaseUrl,
  logo,
  logoAltText,
  onNavigate,
}) => {
  const handleClick = (e, url) => {
    e.preventDefault();
    const isAbsoluteUrl = /^https?:\/\//i.test(url);

    if (isAbsoluteUrl) {
      window.location.href = url;
    } else if (onNavigate) {
      onNavigate(`${url}`);
    }
  };

  return (
    <Hyperlink destination={studioBaseUrl} onClick={(e) => handleClick(e, studioBaseUrl)}>
      <img
        src={logo}
        alt={logoAltText}
        className="d-block logo"
      />
    </Hyperlink>
  );
};

BrandNav.propTypes = {
  studioBaseUrl: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  logoAltText: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default BrandNav;
