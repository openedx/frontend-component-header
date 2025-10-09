import React, { type FunctionComponent, useContext } from 'react';
import Responsive from 'react-responsive';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform';

import MobileHeader from './MobileHeader';
import HeaderBody, { HeaderBodyProps } from './HeaderBody';

ensureConfig([
  'STUDIO_BASE_URL',
  'SITE_NAME',
  'LOGOUT_URL',
  'LOGIN_URL',
  'LOGO_URL',
], 'Studio Header component');

type Props = Pick<HeaderBodyProps,
| 'number'
| 'org'
| 'title'
| 'containerProps'
| 'isHiddenMainMenu'
| 'mainMenuDropdowns'
| 'outlineLink'
| 'searchButtonAction'
> & {
  isNewHomePage: boolean;
};

const StudioHeader: FunctionComponent<Props> = ({
  number,
  org,
  title,
  containerProps,
  isHiddenMainMenu,
  mainMenuDropdowns,
  outlineLink,
  searchButtonAction,
  isNewHomePage,
}) => {
  // @ts-expect-error - frontend-platform doesn't yet have type information :/
  const { authenticatedUser, config } = useContext(AppContext);
  const props = {
    logo: config.LOGO_URL,
    logoAltText: `Studio ${config.SITE_NAME}`,
    number,
    org,
    title,
    containerProps,
    username: authenticatedUser?.username,
    isAdmin: authenticatedUser?.administrator,
    authenticatedUserAvatar: authenticatedUser?.avatar,
    studioBaseUrl: isNewHomePage ? '/home' : config.STUDIO_BASE_URL,
    logoutUrl: config.LOGOUT_URL,
    isHiddenMainMenu,
    mainMenuDropdowns,
    outlineLink,
    searchButtonAction,
  };

  return (
    <div className="studio-header">
      <a className="nav-skip sr-only sr-only-focusable" href="#main">Skip to content</a>
      <Responsive maxWidth={841}>
        <MobileHeader {...props} />
      </Responsive>
      <Responsive minWidth={842}>
        <HeaderBody {...props} />
      </Responsive>
    </div>
  );
};

export default StudioHeader;
