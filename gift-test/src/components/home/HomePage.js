import React from 'react';
import {Link} from 'react-router';
import I18n from  'i18n-js';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>{I18n.t('HomeScreen.HelloWorld')}</h1>
        <Link to="courses" className="btn btn-primary btn-lg">Courses</Link>
      </div>
    );
  }
}

export default HomePage;
