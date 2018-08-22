import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import I18n from 'i18n-js';

const CourseListRow = ({course}) => {
  return (
    <tr>
      <td><a href={course.watchHref} target="_blank">{I18n.t('CoursesScreen.Watch')} </a></td>
      <td>{course.title}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseListRow;
