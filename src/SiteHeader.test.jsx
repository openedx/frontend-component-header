
import React from 'react';
import { IntlProvider } from '@edx/frontend-i18n';
import TestRenderer from 'react-test-renderer';
import { AuthenticationContext } from '@edx/frontend-base';
import { Context as ResponsiveContext } from 'react-responsive';

import SiteHeader from './index';

describe('<SiteHeader />', () => {
  it('renders correctly for desktop', () => {
    const component = (
      <ResponsiveContext.Provider value={{ width: 1280 }}>
        <IntlProvider locale="en" messages={{}}>
          <AuthenticationContext.Provider
            value={{
              userId: null,
              username: null,
              administrator: false,
            }}
          >
            <SiteHeader />
          </AuthenticationContext.Provider>
        </IntlProvider>
      </ResponsiveContext.Provider>
    );

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders correctly for mobile', () => {
    const component = (
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <IntlProvider locale="en" messages={{}}>
          <AuthenticationContext.Provider
            value={{
              userId: null,
              username: null,
              administrator: false,
            }}
          >
            <SiteHeader />
          </AuthenticationContext.Provider>
        </IntlProvider>
      </ResponsiveContext.Provider>
    );

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
