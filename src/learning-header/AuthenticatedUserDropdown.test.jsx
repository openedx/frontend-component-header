import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import messages from './messages';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(),
}));

const configMock = {
  LMS_BASE_URL: 'https://lms.example.com',
  ACCOUNT_PROFILE_URL: 'https://accounts.example.com',
  ACCOUNT_SETTINGS_URL: 'https://accounts.example.com/settings',
  ORDER_HISTORY_URL: 'https://lms.example.com/orders',
  LOGOUT_URL: 'https://lms.example.com/logout',
};

describe('AuthenticatedUserDropdown', () => {
  const username = 'testuser';

  beforeEach(() => {
    getConfig.mockReturnValue(configMock);
  });

  const renderComponent = () => {
    render(
      <IntlProvider locale="en">
        <AuthenticatedUserDropdown username={username} />
      </IntlProvider>,
    );
  };

  it('renders username in toggle button', () => {
    renderComponent();
    expect(screen.getByText(username)).toBeInTheDocument();
  });

  it('renders dropdown items after toggle click', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: 'User Options' });
    await fireEvent.click(toggleButton);

    expect(screen.getByText(messages.dashboard.defaultMessage)).toHaveAttribute('href', `${configMock.LMS_BASE_URL}/dashboard`);
    expect(screen.getByText(messages.profile.defaultMessage)).toHaveAttribute('href', `${configMock.ACCOUNT_PROFILE_URL}/u/${username}`);
    expect(screen.getByText(messages.account.defaultMessage)).toHaveAttribute('href', configMock.ACCOUNT_SETTINGS_URL);
    expect(screen.getByText(messages.orderHistory.defaultMessage)).toHaveAttribute('href', configMock.ORDER_HISTORY_URL);
    expect(screen.getByText(messages.signOut.defaultMessage)).toHaveAttribute('href', configMock.LOGOUT_URL);
  });

  it('loops focus from last to first and vice versa with Tab and Shift+Tab', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: 'User Options' });
    await fireEvent.click(toggleButton);

    const menuItems = await screen.findAllByRole('menuitem');
    const firstItem = menuItems[0];
    const lastItem = menuItems[menuItems.length - 1];

    lastItem.focus();
    expect(lastItem).toHaveFocus();

    fireEvent.keyDown(lastItem, { key: 'Tab' });
    expect(firstItem).toHaveFocus();

    firstItem.focus();
    expect(firstItem).toHaveFocus();

    fireEvent.keyDown(firstItem, { key: 'Tab', shiftKey: true });
    expect(lastItem).toHaveFocus();
  });

  it('focuses next link when Tab is pressed on middle item', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: 'User Options' });
    await fireEvent.click(toggleButton);

    const menuItems = await screen.findAllByRole('menuitem');
    const secondItem = menuItems[1];
    const thirdItem = menuItems[2];

    secondItem.focus();
    expect(secondItem).toHaveFocus();

    Object.defineProperty(secondItem, 'nextElementSibling', {
      value: thirdItem,
      configurable: true,
    });
    Object.defineProperty(thirdItem, 'tagName', {
      value: 'A',
      configurable: true,
    });

    fireEvent.keyDown(secondItem, { key: 'Tab' });

    expect(thirdItem).toHaveFocus();
  });
});
