import React from 'react';
import PropTypes from 'prop-types';

function ContentTitleBlock({ title, subtitle, destination, ariaLabel }) {
  return (
    <a
      className="course-title-lockup w-25"
      href={destination}
      aria-label={ariaLabel}
    >
      <span className="d-block small m-0" data-testid="course-org-number">{subtitle}</span>
      <span className="d-block m-0 font-weight-bold" data-testid="course-title">{title}</span>
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
