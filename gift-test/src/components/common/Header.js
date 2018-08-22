import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import I18n from 'i18n-js';

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">{I18n.t('Common.Home')}</IndexLink>
      {" | "}
      <Link to="/courses" activeClassName="active">{I18n.t('Common.Courses')}</Link>
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
