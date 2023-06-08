import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import messages from './messages';
import Navlinks from '../navigation/nav-links/NavLinks';
import HamburgerMenu from '../navigation/hamburger-menu/HamburgerMenu';

function LinkedLogo({
  href,
  src,
  alt,
  ...attributes
}) {
  return (
    <a href={href} {...attributes}>
      <img className="d-block" src={src} alt={alt} />
    </a>
  );
}

LinkedLogo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

function LearningHeader({
  courseOrg, courseNumber, courseTitle, intl, showUserDropdown, showTabs
}) {
  const { authenticatedUser } = useContext(AppContext);
  const [tabs, setTabs] = useState([]);
  const [activeTab] = useState("catalog");

  useEffect(() => {
    const url = `${getConfig().LMS_BASE_URL}/wikimedia_general/api/v0/lms_tabs`;

    getAuthenticatedHttpClient().get(url).then(({ data }) => {
        setTabs(data.tabs);
      });

  }, []);
  const headerLogo = (
    <LinkedLogo
      className="logo"
      href={`${getConfig().LMS_BASE_URL}/dashboard`}
      src={getConfig().LOGO_URL}
      alt={getConfig().SITE_NAME}
    />
  );

  return (
    <header className="learning-header">
      <a className="sr-only sr-only-focusable" href="#main-content">{intl.formatMessage(messages.skipNavLink)}</a>
      <div className="container-xl py-2 d-flex align-items-center">
        {headerLogo}
        <div className={`${showTabs ? "" : "flex-grow-1"} course-title-lockup`} style={{ lineHeight: 1 }}>
          <span className="d-block small m-0">{courseOrg} {courseNumber}</span>
          <span className="d-block m-0 font-weight-bold course-title">{courseTitle}</span>
        </div>
        
        { showTabs && ( <Navlinks tabs={tabs} activeTab={activeTab}/> ) }
        
        {showUserDropdown && authenticatedUser && (
          <AuthenticatedUserDropdown
          username={authenticatedUser.username}
          />
          )}
        {showUserDropdown && !authenticatedUser && (
          <AnonymousUserMenu />
          )}
      </div>
      { showTabs && ( <HamburgerMenu tabs={tabs} activeTab={activeTab} /> ) }
    </header>
  );
}

LearningHeader.propTypes = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
  showTabs: PropTypes.bool,
};

LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true,
  showTabs: true,
};

export default injectIntl(LearningHeader);
