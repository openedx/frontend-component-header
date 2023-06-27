import React from 'react';

import {
  act, fireEvent, render, screen, within,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Context as ResponsiveContext } from 'react-responsive';
import { Factory } from 'rosie';

import { initializeMockApp } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppContext, AppProvider } from '@edx/frontend-platform/react';

import AuthenticatedUserDropdown from '../learning-header/AuthenticatedUserDropdown';
import { initializeStore } from '../store';
import { markNotificationAsReadApiUrl } from './data/api';
import mockNotificationsResponse from './test-utils';

import './data/__factories__';

const markedAllNotificationsAsReadApiUrl = markNotificationAsReadApiUrl();

let axiosMock;
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

describe('Notification sections test cases.', () => {
  beforeEach(async () => {
    initializeMockApp({
      authenticatedUser: {
        userId: 3,
        username: 'abc123',
        administrator: true,
        roles: [],
      },
    });

    axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    Factory.resetAll();
    store = initializeStore();

    ({ store, axiosMock } = await mockNotificationsResponse());
  });

  it('Successfully viewed last 24 hours and earlier section along with mark all as read label.', async () => {
    renderComponent();

    const bellIcon = screen.queryByTestId('notification-bell-icon');
    await act(async () => { fireEvent.click(bellIcon); });
    const notificationTraySection = screen.queryByTestId('notification-tray-section');

    expect(within(notificationTraySection).queryByText('Last 24 hours')).toBeInTheDocument();
    expect(within(notificationTraySection).queryByText('Earlier')).toBeInTheDocument();
    expect(within(notificationTraySection).queryByText('Mark all as read')).toBeInTheDocument();
  });

  it('Successfully marked all notifications as read, removing the unread status.', async () => {
    axiosMock.onPut(markedAllNotificationsAsReadApiUrl).reply(200, { message: 'Notifications marked read.' });
    renderComponent();

    const bellIcon = screen.queryByTestId('notification-bell-icon');
    await act(async () => { fireEvent.click(bellIcon); });
    const markAllReadButton = screen.queryByTestId('mark-all-read');

    expect(screen.queryByTestId('unread-notification-1')).toBeInTheDocument();
    await act(async () => { fireEvent.click(markAllReadButton); });

    expect(screen.queryByTestId('unread-notification-1')).not.toBeInTheDocument();
  });

  it('Successfully load more notifications by clicking on load more notification button.', async () => {
    renderComponent();

    const bellIcon = screen.queryByTestId('notification-bell-icon');
    await act(async () => { fireEvent.click(bellIcon); });

    const loadMoreButton = screen.queryByTestId('load-more-notifications');

    expect(screen.queryAllByTestId('notification-contents')).toHaveLength(10);
    await act(async () => { fireEvent.click(loadMoreButton); });

    expect(screen.queryAllByTestId('notification-contents')).toHaveLength(16);
  });
});
