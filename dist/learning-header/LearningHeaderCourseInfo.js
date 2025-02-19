import React from 'react';
import PropTypes from 'prop-types';
var LearningHeaderCourseInfo = function LearningHeaderCourseInfo(_ref) {
  var courseOrg = _ref.courseOrg,
    courseNumber = _ref.courseNumber,
    courseTitle = _ref.courseTitle;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "d-block small m-0"
  }, courseOrg, " ", courseNumber), /*#__PURE__*/React.createElement("span", {
    className: "d-block m-0 font-weight-bold course-title"
  }, courseTitle));
};
export var courseInfoDataShape = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string
};
LearningHeaderCourseInfo.propTypes = courseInfoDataShape;
export default LearningHeaderCourseInfo;
//# sourceMappingURL=LearningHeaderCourseInfo.js.map