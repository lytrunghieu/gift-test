import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';
import I18n from 'i18n-js';

const CourseList = ({courses}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>{I18n.t('CoursesScreen.Title')}</th>
        <th>{I18n.t('CoursesScreen.Category')}</th>
        <th>{I18n.t('CoursesScreen.Length')}</th>
      </tr>
      </thead>
      <tbody>
      {courses.map(course =>
        <CourseListRow key={course.id} course={course}/>
      )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CourseList;
