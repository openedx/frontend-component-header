import React from 'react';
import PropTypes from 'prop-types';

function ContentTitleBlock({ title, subtitle, destination, ariaLabel }) {
  return (
    <a
      className='content-title-block'
      href={destination}
      aria-label={ariaLabel}
    >
      <span className="d-block small m-0">{subtitle}</span>
      <span className="d-block m-0 font-weight-bold">{title}</span>
    </a>
  );
}

ContentTitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  destination: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default ContentTitleBlock;
