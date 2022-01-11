import React, { useContext } from "react";
import PropTypes from "prop-types";
import { getConfig } from "@edx/frontend-platform";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";
import { AppContext } from "@edx/frontend-platform/react";

import AnonymousUserMenu from "./AnonymousUserMenu";
import AuthenticatedUserDropdown from "./AuthenticatedUserDropdown";
import messages from "./messages";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function LinkedLogo({ href, src, alt, ...attributes }) {
  return (
    <Navbar.Brand href={href} {...attributes}>
      <img className="d-block" src={src} alt={alt} />
    </Navbar.Brand>
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
    <Navbar className="learning-header">
      <Container>
        {headerLogo}
        <Navbar.Toggle />

        <Navbar.Collapse
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <Nav className="navbar-nav mr-auto">
            <Nav.Item>
              <Nav.Link
                className="sr-only sr-only-focusable"
                href="#main-content"
              >
                {intl.formatMessage(messages.skipNavLink)}
              </Nav.Link>
            </Nav.Item>
            <Navbar.Text>
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
            </Navbar.Text>
          </Nav>
          <Nav>
            {showUserDropdown && authenticatedUser && (
              <AuthenticatedUserDropdown
                username={authenticatedUser.username}
              />
            )}
            {showUserDropdown && !authenticatedUser && <AnonymousUserMenu />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
