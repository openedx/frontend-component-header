import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningHeaderCourseInfo, { courseInfoDataShape } from '../../learning-header/LearningHeaderCourseInfo';

const CourseInfoSlot = ({
  courseOrg,
  courseNumber,
  courseTitle,
  ...attributes
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_learning_course_info.v1"
    idAliases={['course_info_slot']}
    slotOptions={{
      mergeProps: true,
    }}
    pluginProps={{
      courseOrg,
      courseNumber,
      courseTitle,
    }}
  >
    <LearningHeaderCourseInfo
      courseOrg={courseOrg}
      courseNumber={courseNumber}
      courseTitle={courseTitle}
      {...attributes}
    />
  </PluginSlot>
);

CourseInfoSlot.propTypes = courseInfoDataShape;

export default CourseInfoSlot;
