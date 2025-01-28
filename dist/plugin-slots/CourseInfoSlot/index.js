var _excluded = ["courseOrg", "courseNumber", "courseTitle"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningHeaderCourseInfo, { courseInfoDataShape } from '../../learning-header/LearningHeaderCourseInfo';
var CourseInfoSlot = function CourseInfoSlot(_ref) {
  var courseOrg = _ref.courseOrg,
    courseNumber = _ref.courseNumber,
    courseTitle = _ref.courseTitle,
    attributes = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "course_info_slot",
    slotOptions: {
      mergeProps: true
    },
    pluginProps: {
      courseOrg: courseOrg,
      courseNumber: courseNumber,
      courseTitle: courseTitle
    }
  }, /*#__PURE__*/React.createElement(LearningHeaderCourseInfo, _extends({
    courseOrg: courseOrg,
    courseNumber: courseNumber,
    courseTitle: courseTitle
  }, attributes)));
};
CourseInfoSlot.propTypes = courseInfoDataShape;
export default CourseInfoSlot;
//# sourceMappingURL=index.js.map