import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const LearningUserMenuToggle = ({
  username,
  icon,
}) => (
  <>
    <FontAwesomeIcon icon={icon} className="d-md-none" size="lg" />
    <span data-hj-suppress className="d-none d-md-inline">
      {username}
    </span>
  </>
);

export const LearningUserMenuTogglePropTypes = {
  username: PropTypes.string.isRequired,
  // Full shape available by examining @fortawesome/fontawesome-common-types/index.d.ts.
  icon: PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
  }).isRequired,
};

LearningUserMenuToggle.propTypes = LearningUserMenuTogglePropTypes;

export default LearningUserMenuToggle;
