import React, { useContext, useEffect, useState } from 'react';
import Responsive from 'react-responsive';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import LogoSlot from '../plugin-slots/LogoSlot';
import CourseInfoSlot from '../plugin-slots/CourseInfoSlot';
import { courseInfoDataShape } from './LearningHeaderCourseInfo';
import messages from './messages';
import getCourseLogoOrg from './data/api';
import LanguageSelector from '../LanguageSelector';

const LinkedLogo = ({
  href,
  src,
  alt,
  ...attributes
}) => (
  <a href={href} {...attributes}>
    <img className="d-block" src={src} alt={alt} />
  </a>
);

LinkedLogo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
const LearningHeader = ({
  courseOrg, courseTitle, intl, showUserDropdown,
}) => {
  const { authenticatedUser } = useContext(AppContext);
  const [logoOrg, setLogoOrg] = useState(null);
  const enableOrgLogo = getConfig().ENABLE_ORG_LOGO;

  useEffect(() => {
    if (courseOrg && enableOrgLogo) {
      getCourseLogoOrg().then((logoOrgUrl) => { setLogoOrg(logoOrgUrl); });
    }
  }, [courseOrg, enableOrgLogo]);

  const headerLogo = (
    <>
      <Responsive maxWidth={769}>
        <LogoSlot
          href={`${getConfig().LMS_BASE_URL}/dashboard`}
          src={getConfig().LOGO_URL_MOBILE || getConfig().LOGO_URL}
          alt={getConfig().SITE_NAME}
        />
      </Responsive>
      <Responsive minWidth={769}>
        <LogoSlot
          href={`${getConfig().LMS_BASE_URL}/dashboard`}
          src={getConfig().LOGO_URL}
          alt={getConfig().SITE_NAME}
        />
      </Responsive>
    </>
  );

  return (
    <header className="learning-header">
      <a className="sr-only sr-only-focusable" href="#main-content">{intl.formatMessage(messages.skipNavLink)}</a>
      <div className="container-xl py-2 d-flex align-items-center">
        {headerLogo}
        <div className="d-none d-md-block flex-grow-1 course-title-lockup">
          <div className={`d-md-flex ${enableOrgLogo && 'align-items-center justify-content-center'} w-100`}>
            {enableOrgLogo ? (
              (courseOrg && logoOrg)
              && <img src={logoOrg} alt={`${courseOrg} logo`} style={{ maxHeight: '45px' }} />
            ) : null}
            <span
              className="d-inline-block course-title font-weight-semibold ml-3 text-truncate text-left w-25"
              style={{ fontSize: '0.85rem' }}
            >
              {courseTitle}
            </span>
          </div>
        </div>
        {getConfig().ENABLE_HEADER_LANG_SELECTOR && (
          <div className="mx-2 d-md-inline-flex">
            <Responsive maxWidth={1000}>
              <LanguageSelector
                options={JSON.parse(getConfig().SITE_SUPPORTED_LANGUAGES)}
                compact
                authenticatedUser={authenticatedUser}
              />
            </Responsive>
            <Responsive minWidth={1000}>
              <LanguageSelector
                options={JSON.parse(getConfig().SITE_SUPPORTED_LANGUAGES)}
                compact={false}
                authenticatedUser={authenticatedUser}
              />
            </Responsive>
          </div>
        )}
        {showUserDropdown && authenticatedUser && (
          <AuthenticatedUserDropdown
            username={authenticatedUser.username}
          />
        )}
        {showUserDropdown && !authenticatedUser && (
          <AnonymousUserMenu />
        )}
      </div>
    </header>
  );
};

LearningHeader.propTypes = {
  courseOrg: PropTypes.string,
  courseTitle: PropTypes.string,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  courseOrg: null,
  courseTitle: null,
  showUserDropdown: true,
};

export default injectIntl(LearningHeader);
