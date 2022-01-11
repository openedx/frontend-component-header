import React, { useContext } from "react";
import PropTypes from "prop-types";
import { getConfig } from "@edx/frontend-platform";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";
import { AppContext } from "@edx/frontend-platform/react";

import AnonymousUserMenu from "./AnonymousUserMenu";
import AuthenticatedUserDropdown from "./AuthenticatedUserDropdown";
import messages from "./messages";

function LinkedLogo({ href, src, alt, ...attributes }) {
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
  courseOrg,
  courseNumber,
  courseTitle,
  intl,
  showUserDropdown,
}) {
  const { authenticatedUser } = useContext(AppContext);

  const headerLogo = (
    <LinkedLogo
      className="logo navbar-brand"
      href={`${getConfig().LMS_BASE_URL}/dashboard`}
      src={getConfig().LOGO_URL}
      alt={getConfig().SITE_NAME}
    />
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light learning-header">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {headerLogo}
          <a className="sr-only sr-only-focusable" href="#main-content">
            {intl.formatMessage(messages.skipNavLink)}
          </a>
          <div className="container-xl py-2 d-flex align-items-center">
            <div
              className="flex-grow-1 course-title-lockup"
              style={{ lineHeight: 1 }}
            >
              <span className="d-block small m-0">
                {courseOrg} {courseNumber}
              </span>
              <span className="d-block m-0 font-weight-bold course-title">
                {courseTitle}
              </span>
            </div>
          </div>
        </ul>
        <ul className="navbar-nav">
          {showUserDropdown && authenticatedUser && (
            <AuthenticatedUserDropdown username={authenticatedUser.username} />
          )}
          {showUserDropdown && !authenticatedUser && <AnonymousUserMenu />}
        </ul>
      </div>
    </nav>
  );
}

LearningHeader.propTypes = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true,
};

export default injectIntl(LearningHeader);
