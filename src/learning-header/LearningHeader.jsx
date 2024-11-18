import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { useLocation } from 'react-router-dom';
import { ProductTour } from '@openedx/paragon';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import LogoSlot from '../plugin-slots/LogoSlot';
import messages from './messages';

const MyTourComponent = () => {
  const [isTourEnabled, setIsTourEnabled] = useState(true);
  const config = getConfig();
  const location = useLocation();
  const stepperInstructions = config[location.pathname]?.instruction;

  if (!stepperInstructions) {
    return null;
  }

  const myFirstTour = {
    tourId: 'myFirstTour',
    advanceButtonText: 'Next',
    dismissButtonText: 'Dismiss',
    endButtonText: 'Okay',
    enabled: isTourEnabled,
    onDismiss: () => setIsTourEnabled(false),
    onEnd: () => setIsTourEnabled(false),
    checkpoints: stepperInstructions.checkpoints.map((checkpoint) => ({
      ...checkpoint,
      onDismiss: checkpoint.onDismiss || (() => setIsTourEnabled(false)),
      onEnd: checkpoint.onEnd || (() => setIsTourEnabled(false)),
    })),
  };

  return (
    <ProductTour tours={[myFirstTour]} />
  );
};

const LearningHeader = ({
  courseOrg, courseNumber, courseTitle, intl, showUserDropdown,
}) => {
  const { authenticatedUser } = useContext(AppContext);

  const headerLogo = (
    <LogoSlot
      href={`${getConfig().LMS_BASE_URL}/dashboard`}
      src={getConfig().LOGO_URL}
      alt={getConfig().SITE_NAME}
    />
  );

  return (
    <header className="learning-header">
      <MyTourComponent />
      <a className="sr-only sr-only-focusable" href="#main-content">{intl.formatMessage(messages.skipNavLink)}</a>
      <div className="container-xl py-2 d-flex align-items-center">
        {headerLogo}
        <div className="flex-grow-1 course-title-lockup" style={{ lineHeight: 1 }}>
          <span className="d-block small m-0">{courseOrg} {courseNumber}</span>
          <span className="d-block m-0 font-weight-bold course-title">{courseTitle}</span>
        </div>
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
