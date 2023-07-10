import React from 'react';

import {
  act, fireEvent, render, screen, within,
} from '@testing-library/react';
import { Context as ResponsiveContext } from 'react-responsive';
import { Factory } from 'rosie';

import { initializeMockApp } from '@edx/frontend-platform';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppContext, AppProvider } from '@edx/frontend-platform/react';

import AuthenticatedUserDropdown from '../learning-header/AuthenticatedUserDropdown';
import { initializeStore } from '../store';
import mockNotificationsResponse from './test-utils';

import './data/__factories__';

let store;

function renderComponent() {
  render(
    <ResponsiveContext.Provider>
      <IntlProvider locale="en" messages={{}}>
        <AppProvider store={store}>
          <AppContext.Provider>
            <AuthenticatedUserDropdown />
          </AppContext.Provider>
        </AppProvider>
      </IntlProvider>
    </ResponsiveContext.Provider>,
  );
}

describe('Notification Tabs test cases.', () => {
  beforeEach(async () => {
    initializeMockApp({
      authenticatedUser: {
        userId: '123abc',
        username: 'testuser',
        administrator: false,
        roles: [],
      },
    });

    Factory.resetAll();
    store = initializeStore();

    ({ store } = await mockNotificationsResponse());
  });

  it('Notification tabs displayed with default discussion tab selected and no unseen counts.', async () => {
    renderComponent();

    const bellIcon = screen.queryByTestId('notification-bell-icon');
    await act(async () => { fireEvent.click(bellIcon); });

    const tabs = screen.queryAllByRole('tab');
    const selectedTab = tabs.find(tab => tab.getAttribute('aria-selected') === 'true');

    expect(tabs.length).toEqual(5);
    expect(within(selectedTab).queryByText('discussion')).toBeInTheDocument();
    expect(within(selectedTab).queryByRole('status')).not.toBeInTheDocument();
  });

  it('Successfully showed unseen counts for unselected tabs.', async () => {
    renderComponent();
    const bellIcon = screen.queryByTestId('notification-bell-icon');
    await act(async () => { fireEvent.click(bellIcon); });

    const tabs = screen.getAllByRole('tab');

    expect(within(tabs[0]).queryByRole('status')).toBeInTheDocument();
  });

  it('Successfully selected reminder tab.', async () => {
    renderComponent();

    const bellIcon = screen.queryByTestId('notification-bell-icon');
    await act(async () => { fireEvent.click(bellIcon); });
    const notificationTab = screen.getAllByRole('tab');

    await act(async () => { fireEvent.click(notificationTab[0], { dataset: { rbEventKey: 'reminders' } }); });

    const tabs = screen.queryAllByRole('tab');
    const selectedTab = tabs.find(tab => tab.getAttribute('aria-selected') === 'true');

    expect(within(selectedTab).queryByText('reminders')).toBeInTheDocument();
    expect(within(selectedTab).queryByRole('status')).not.toBeInTheDocument();
  });
});
