/* eslint-disable react/prop-types */
import React from 'react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import TestRenderer from 'react-test-renderer';
import { AppContext } from '@edx/frontend-platform/react';

import { StudioHeader } from './index';

function StudioHeaderComponent({ contextValue, appMenu = null, mainMenu = [] }) {
  return (
    <IntlProvider locale="en" messages={{}}>
      <AppContext.Provider
        value={contextValue}
      >
        <StudioHeader appMenu={appMenu} mainMenu={mainMenu} />
      </AppContext.Provider>
    </IntlProvider>
  );
}

describe('<StudioHeader />', () => {
  it('renders correctly', () => {
    const contextValue = {
      authenticatedUser: {
        userId: 'abc123',
        username: 'edX',
        roles: [],
        administrator: false,
      },
      config: {
        STUDIO_BASE_URL: process.env.STUDIO_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL,
      },
    };

    const component = <StudioHeaderComponent contextValue={contextValue} />;

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with the optional app menu', () => {
    const appMenu = {
      content: 'App Menu',
      menuItems: [
        {
          type: 'dropdown',
          href: 'https://menu-href-url.org',
          content: 'Content 1',
        },
        {
          type: 'dropdown',
          href: 'https://menu-href-url.org',
          content: 'Content 2',
        },
        {
          type: 'dropdown',
          href: 'https://menu-href-url.org',
          content: 'Content 3',
        },
      ],
    };
    const contextValue = {
      authenticatedUser: {
        userId: 'abc123',
        username: 'edX',
        roles: [],
        administrator: false,
      },
      config: {
        STUDIO_BASE_URL: process.env.STUDIO_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL,
      },
    };
    const component = <StudioHeaderComponent contextValue={contextValue} appMenu={appMenu} />;

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with the optional main menu', () => {
    const mainMenu = [
      {
        type: 'dropdown',
        href: 'https://menu-href-url.org',
        content: 'Content 1',
      },
      {
        type: 'dropdown',
        href: 'https://menu-href-url.org',
        content: 'Content 2',
      },
      {
        type: 'dropdown',
        href: 'https://menu-href-url.org',
        content: 'Content 3',
      },
    ];
    const contextValue = {
      authenticatedUser: {
        userId: 'abc123',
        username: 'edX',
        roles: [],
        administrator: false,
      },
      config: {
        STUDIO_BASE_URL: process.env.STUDIO_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL,
      },
    };
    const component = <StudioHeaderComponent contextValue={contextValue} mainMenu={mainMenu} />;

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
