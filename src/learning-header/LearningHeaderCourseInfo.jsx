import React from 'react';
import PropTypes from 'prop-types';

const LearningHeaderCourseInfo = ({
  courseOrg,
  courseNumber,
  courseTitle,
}) => (
  <div style={{ minWidth: 0 }}>
    <span className="d-block small m-0">{courseOrg} {courseNumber}</span>
    <span className="d-block m-0 font-weight-bold course-title">{courseTitle}</span>
  </div>
);

export const courseInfoDataShape = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
};

LearningHeaderCourseInfo.propTypes = courseInfoDataShape;

export default LearningHeaderCourseInfo;
