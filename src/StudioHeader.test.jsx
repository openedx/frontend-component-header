/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import TestRenderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { AppContext } from '@edx/frontend-platform/react';
import {
  ActionRow,
  Button,
  Dropdown,
} from '@edx/paragon';

import { StudioHeader } from './index';

const StudioHeaderComponent = ({ contextValue, appMenu = null, mainMenu = [] }) => (
  <IntlProvider locale="en" messages={{}}>
    <AppContext.Provider
      value={contextValue}
    >
      <StudioHeader appMenu={appMenu} mainMenu={mainMenu} />
    </AppContext.Provider>
  </IntlProvider>
);

const StudioHeaderContext = ({ actionRowContent = null }) => {
  const headerContextValue = useMemo(() => ({
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
  }), []);
  return (
    <IntlProvider locale="en" messages={{}}>
      <AppContext.Provider
        value={headerContextValue}
      >
        <StudioHeader actionRowContent={actionRowContent} />
      </AppContext.Provider>
    </IntlProvider>
  );
};

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

  it('renders correctly with optional action row content', () => {
    const actionRowContent = (
      <>
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="library-header-menu-dropdown">
            Settings
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="#">Dropdown Item 1</Dropdown.Item>
            <Dropdown.Item as={Link} to="#">Dropdown Item 2</Dropdown.Item>
            <Dropdown.Item as={Link} to="#">Dropdown Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ActionRow.Spacer />
        <Button
          variant="tertiary"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
          title="Help Button"
        >Help
        </Button>
      </>
    );

    const component = <StudioHeaderContext actionRowContent={actionRowContent} />;

    const wrapper = TestRenderer.create(component);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
