import React from 'react';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import messages from './messages';
import {
  render, screen, fireEvent, initializeMockApp,
} from '../setupTest';

describe('AuthenticatedUserDropdown', () => {
  const username = 'testuser';

  beforeEach(() => {
    initializeMockApp();
  });

  const renderComponent = () => {
    render(
      <AuthenticatedUserDropdown username={username} />,
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

    expect(await screen.findByText(messages.dashboard.defaultMessage))
      .toHaveAttribute('href', `${process.env.LMS_BASE_URL}/dashboard`);

    expect(screen.getByText(messages.profile.defaultMessage)).toHaveAttribute('href', `${process.env.ACCOUNT_PROFILE_URL}/u/${username}`);
    expect(screen.getByText(messages.account.defaultMessage)).toHaveAttribute('href', process.env.ACCOUNT_SETTINGS_URL);
    expect(screen.getByText(messages.orderHistory.defaultMessage)).toHaveAttribute('href', process.env.ORDER_HISTORY_URL);
    expect(screen.getByText(messages.signOut.defaultMessage)).toHaveAttribute('href', process.env.LOGOUT_URL);
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
