/* eslint-disable react/prop-types */
import React from 'react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import TestRenderer from 'react-test-renderer';
import { AppContext } from '@edx/frontend-platform/react';
import { Context as ResponsiveContext } from 'react-responsive';

import Header from './index';

const HeaderComponent = ({ width, contextValue }) => (
  <ResponsiveContext.Provider value={width}>
    <IntlProvider locale="en" messages={{}}>
      <AppContext.Provider
        value={contextValue}
      >
        <Header />
      </AppContext.Provider>
    </IntlProvider>
  </ResponsiveContext.Provider>
);

describe('<Header />', () => {
  it('renders correctly for anonymous desktop', () => {
    const contextValue = {
      authenticatedUser: null,
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL,
      },
    };
    const component = <HeaderComponent width={{ width: 1280 }} contextValue={contextValue} />;

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders correctly for authenticated desktop with username', () => {
    const contextValue = {
      authenticatedUser: {
        userId: 'abc123',
        username: 'edX',
        name: 'edX',
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
    };
    const component = <HeaderComponent width={{ width: 1280 }} contextValue={contextValue} />;

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders correctly for authenticated desktop without username', () => {
    const contextValue = {
      authenticatedUser: {
        userId: 'abc123',
        name: 'edX',
        roles: [],
        administrator: false,
      },
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL,
        HIDE_USERNAME_FROM_HEADER: true,
      },
    };
    const component = <HeaderComponent width={{ width: 1280 }} contextValue={contextValue} />;

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders correctly for anonymous mobile', () => {
    const contextValue = {
      authenticatedUser: null,
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL,
      },
    };
    const component = <HeaderComponent width={{ width: 500 }} contextValue={contextValue} />;

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders correctly for authenticated mobile', () => {
    const contextValue = {
      authenticatedUser: {
        userId: 'abc123',
        username: 'edX',
        name: 'edX',
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
    };
    const component = <HeaderComponent width={{ width: 500 }} contextValue={contextValue} />;

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
