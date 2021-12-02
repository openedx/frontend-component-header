/* eslint-disable import/no-extraneous-dependencies */

import Enzyme from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'babel-polyfill';
import 'jest-chain';
import { getConfig, mergeConfig } from '@edx/frontend-platform';
import { configure as configureLogging } from '@edx/frontend-platform/logging';
import { configure as configureI18n } from '@edx/frontend-platform/i18n';
import { configure as configureAuth, MockAuthService } from '@edx/frontend-platform/auth';
import { render as rtlRender } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import AppProvider from '@edx/frontend-platform/react/AppProvider';
import appMessages from './i18n';

Enzyme.configure({ adapter: new Adapter() });

// These configuration values are usually set in webpack's EnvironmentPlugin however
// Jest does not use webpack so we need to set these so for testing
process.env.ACCESS_TOKEN_COOKIE_NAME = 'edx-jwt-cookie-header-payload';
process.env.BASE_URL = 'localhost:1995';
process.env.CREDENTIALS_BASE_URL = 'http://localhost:18150';
process.env.CSRF_TOKEN_API_PATH = '/csrf/api/v1/token';
process.env.ECOMMERCE_BASE_URL = 'http://localhost:18130';
process.env.LANGUAGE_PREFERENCE_COOKIE_NAME = 'openedx-language-preference';
process.env.LMS_BASE_URL = 'http://localhost:18000';
process.env.LOGIN_URL = 'http://localhost:18000/login';
process.env.LOGOUT_URL = 'http://localhost:18000/logout';
process.env.MARKETING_SITE_BASE_URL = 'http://localhost:18000';
process.env.ORDER_HISTORY_URL = 'localhost:1996/orders';
process.env.REFRESH_ACCESS_TOKEN_ENDPOINT = 'http://localhost:18000/login_refresh';
process.env.SEGMENT_KEY = 'segment_whoa';
process.env.SITE_NAME = 'edX';
process.env.USER_INFO_COOKIE_NAME = 'edx-user-info';
process.env.LOGO_URL = 'https://edx-cdn.org/v3/default/logo.svg';
process.env.LOGO_TRADEMARK_URL = 'https://edx-cdn.org/v3/default/logo-trademark.svg';
process.env.LOGO_WHITE_URL = 'https://edx-cdn.org/v3/default/logo-white.svg';
process.env.FAVICON_URL = 'https://edx-cdn.org/v3/default/favicon.ico';

class MockLoggingService {
  logInfo = jest.fn();

  logError = jest.fn();
}

export const authenticatedUser = {
  userId: 'abc123',
  username: 'Mock User',
  roles: [],
  administrator: false,
};

export function initializeMockApp() {
  mergeConfig({
    INSIGHTS_BASE_URL: process.env.INSIGHTS_BASE_URL || null,
    STUDIO_BASE_URL: process.env.STUDIO_BASE_URL || null,
    TWITTER_URL: process.env.TWITTER_URL || null,
    BASE_URL: process.env.BASE_URL || null,
    LMS_BASE_URL: process.env.LMS_BASE_URL || null,
    LOGIN_URL: process.env.LOGIN_URL || null,
    LOGOUT_URL: process.env.LOGOUT_URL || null,
    REFRESH_ACCESS_TOKEN_ENDPOINT: process.env.REFRESH_ACCESS_TOKEN_ENDPOINT || null,
    ACCESS_TOKEN_COOKIE_NAME: process.env.ACCESS_TOKEN_COOKIE_NAME || null,
    CSRF_TOKEN_API_PATH: process.env.CSRF_TOKEN_API_PATH || null,
    LOGO_URL: process.env.LOGO_URL || null,
    SITE_NAME: process.env.SITE_NAME || null,

    authenticatedUser: {
      userId: 'abc123',
      username: 'Mock User',
      roles: [],
      administrator: false,
    },
  });

  const loggingService = configureLogging(MockLoggingService, {
    config: getConfig(),
  });
  const authService = configureAuth(MockAuthService, {
    config: getConfig(),
    loggingService,
  });

  // i18n doesn't have a service class to return.
  configureI18n({
    config: getConfig(),
    loggingService,
    messages: [appMessages],
  });

  return { loggingService, authService };
}

function render(
  ui,
  {
    store = null,
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
    // eslint-disable-next-line react/jsx-filename-extension
      <IntlProvider locale="en">
        <AppProvider store={store}>
          {children}
        </AppProvider>
      </IntlProvider>
    );
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything.
export * from '@testing-library/react';

// Override `render` method.
export {
  render,
};
