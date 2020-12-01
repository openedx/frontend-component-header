import React from 'react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import TestRenderer from 'react-test-renderer';
import { AppContext } from '@edx/frontend-platform/react';
import { Context as ResponsiveContext } from 'react-responsive';

import Header from './index';

describe('<Header />', () => {
  it('renders correctly for anonymous desktop', () => {
    const component = (
      <ResponsiveContext.Provider value={{ width: 1280 }}>
        <IntlProvider locale="en" messages={{}}>
          <AppContext.Provider
            value={{
              authenticatedUser: null,
              config: {
                LMS_BASE_URL: process.env.LMS_BASE_URL,
                SITE_NAME: process.env.SITE_NAME,
                LOGIN_URL: process.env.LOGIN_URL,
                LOGOUT_URL: process.env.LOGOUT_URL,
                LOGO_URL: process.env.LOGO_URL,
              },
            }}
          >
            <Header />
          </AppContext.Provider>
        </IntlProvider>
      </ResponsiveContext.Provider>
    );

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders correctly for authenticated desktop', () => {
    const component = (
      <ResponsiveContext.Provider value={{ width: 1280 }}>
        <IntlProvider locale="en" messages={{}}>
          <AppContext.Provider
            value={{
              authenticatedUser: {
                userId: 'abc123',
                username: 'edX',
                roles: [],
                administrator: false,
              },
              config: {
                LMS_BASE_URL: process.env.LMS_BASE_URL,
                SITE_NAME: process.env.SITE_NAME,
                LOGIN_URL: process.env.LOGIN_URL,
                LOGOUT_URL: process.env.LOGOUT_URL,
                LOGO_URL: process.env.LOGO_URL,
              },
            }}
          >
            <Header />
          </AppContext.Provider>
        </IntlProvider>
      </ResponsiveContext.Provider>
    );

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders correctly for anonymous mobile', () => {
    const component = (
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <IntlProvider locale="en" messages={{}}>
          <AppContext.Provider
            value={{
              authenticatedUser: null,
              config: {
                LMS_BASE_URL: process.env.LMS_BASE_URL,
                SITE_NAME: process.env.SITE_NAME,
                LOGIN_URL: process.env.LOGIN_URL,
                LOGOUT_URL: process.env.LOGOUT_URL,
                LOGO_URL: process.env.LOGO_URL,
              },
            }}
          >
            <Header />
          </AppContext.Provider>
        </IntlProvider>
      </ResponsiveContext.Provider>
    );

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders correctly for authenticated mobile', () => {
    const component = (
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <IntlProvider locale="en" messages={{}}>
          <AppContext.Provider
            value={{
              authenticatedUser: {
                userId: 'abc123',
                username: 'edX',
                roles: [],
                administrator: false,
              },
              config: {
                LMS_BASE_URL: process.env.LMS_BASE_URL,
                SITE_NAME: process.env.SITE_NAME,
                LOGIN_URL: process.env.LOGIN_URL,
                LOGOUT_URL: process.env.LOGOUT_URL,
                LOGO_URL: process.env.LOGO_URL,
              },
            }}
          >
            <Header />
          </AppContext.Provider>
        </IntlProvider>
      </ResponsiveContext.Provider>
    );

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
