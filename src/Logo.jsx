import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ content }) => (
  <a href={content.href} className="logo">
    <img className="d-block" src={content.src} alt={content.alt} />
  </a>
);

Logo.propTypes = {
  content: PropTypes.shape({
    href: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Logo;
