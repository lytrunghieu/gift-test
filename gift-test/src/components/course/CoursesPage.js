import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import I18n from 'i18n-js';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.setState({saving: true});// eslint-disable-line react/no-did-mount-set-state
    this.props.actions.loadCourses()
      .catch(error => {
        this.setState({saving: false}); // eslint-disable-line react/no-did-mount-set-state
      });
  }

  render() {
    const {courses} = this.props;

    return (
      <div>
        <h1>{I18n.t('Common.Courses')}</h1>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
