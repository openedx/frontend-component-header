import React from 'react';

import {
  act, fireEvent, render, screen,
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

const markedNotificationAsReadApiUrl = markNotificationAsReadApiUrl();

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

describe('Notification row item test cases.', () => {
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

  it(
    'Successfully viewed notification icon, notification context, unread , course name and notification time.',
    async () => {
      renderComponent();

      const bellIcon = screen.queryByTestId('notification-bell-icon');
      await act(async () => { fireEvent.click(bellIcon); });

      expect(screen.queryByTestId('notification-icon-1')).toBeInTheDocument();
      expect(screen.queryByTestId('notification-content-1')).toBeInTheDocument();
      expect(screen.queryByTestId('notification-course-1')).toBeInTheDocument();
      expect(screen.queryByTestId('notification-created-date-1')).toBeInTheDocument();
      expect(screen.queryByTestId('unread-notification-1')).toBeInTheDocument();
    },
  );

  it('Successfully marked notification as read.', async () => {
    axiosMock.onPatch(markedNotificationAsReadApiUrl).reply(200, { message: 'Notification marked read.' });
    renderComponent();

    const bellIcon = screen.queryByTestId('notification-bell-icon');
    await act(async () => { fireEvent.click(bellIcon); });

    const notification = screen.queryByTestId('notification-1');
    await act(async () => { fireEvent.click(notification); });

    expect(screen.queryByTestId('unread-notification-1')).not.toBeInTheDocument();
  });
});
