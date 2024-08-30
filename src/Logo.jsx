import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({
  href,
  src,
  alt,
  ...attributes
}) => (
  <a href={href} className="logo" {...attributes}>
    <img className="d-block" src={src} alt={alt} />
  </a>
);

Logo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Logo;
