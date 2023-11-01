import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  OverlayTrigger,
  Tooltip,
} from '@edx/paragon';
import messages from './messages';

const CourseLockUp = ({
  outlineLink,
  org,
  number,
  title,
  // injected
  intl,
}) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(outlineLink);

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={(
        <Tooltip id="course-lock-up">
          {title}
        </Tooltip>
    )}
    >
      <a
        className="course-title-lockup w-25 mr-2"
        href={resolvedPath.pathname}
        onClick={(e) => { e.preventDefault(); navigate(resolvedPath.pathname); }}
        aria-label={intl.formatMessage(messages['header.label.courseOutline'])}
        data-testid="course-lock-up-block"
      >
        <span className="d-block small m-0 text-gray-800" data-testid="course-org-number">{org} {number}</span>
        <span className="d-block m-0 font-weight-bold text-gray-800" data-testid="course-title">{title}</span>
      </a>
    </OverlayTrigger>
  );
};

CourseLockUp.propTypes = {
  number: PropTypes.string,
  org: PropTypes.string,
  title: PropTypes.string,
  outlineLink: PropTypes.string,
  // injected
  intl: intlShape.isRequired,
};

CourseLockUp.defaultProps = {
  number: null,
  org: null,
  title: null,
  outlineLink: null,
};

export default injectIntl(CourseLockUp);
