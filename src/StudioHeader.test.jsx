import React from 'react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import TestRenderer from 'react-test-renderer';
import { AppContext } from '@edx/frontend-platform/react';

import { StudioHeader } from './index';

describe('<StudioHeader />', () => {
  it('renders correctly', () => {
    const component = (
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
              STUDIO_BASE_URL: process.env.STUDIO_BASE_URL,
              SITE_NAME: process.env.SITE_NAME,
              LOGIN_URL: process.env.LOGIN_URL,
              LOGOUT_URL: process.env.LOGOUT_URL,
              LOGO_URL: process.env.LOGO_URL,
            },
          }}
        >
          <StudioHeader />
        </AppContext.Provider>
      </IntlProvider>
    );

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
    const component = (
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
              STUDIO_BASE_URL: process.env.STUDIO_BASE_URL,
              SITE_NAME: process.env.SITE_NAME,
              LOGIN_URL: process.env.LOGIN_URL,
              LOGOUT_URL: process.env.LOGOUT_URL,
              LOGO_URL: process.env.LOGO_URL,
            },
          }}
        >
          <StudioHeader appMenu={appMenu} />
        </AppContext.Provider>
      </IntlProvider>
    );

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
    const component = (
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
              STUDIO_BASE_URL: process.env.STUDIO_BASE_URL,
              SITE_NAME: process.env.SITE_NAME,
              LOGIN_URL: process.env.LOGIN_URL,
              LOGOUT_URL: process.env.LOGOUT_URL,
              LOGO_URL: process.env.LOGO_URL,
            },
          }}
        >
          <StudioHeader mainMenu={mainMenu} />
        </AppContext.Provider>
      </IntlProvider>
    );

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
