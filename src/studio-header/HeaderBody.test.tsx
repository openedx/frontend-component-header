import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { MemoryRouter } from 'react-router-dom';

import HeaderBody from './HeaderBody';
import messages from './messages';

const mockOnNavigate = jest.fn();
const mockSearchButtonAction = jest.fn();
const mockToggleModalPopup = jest.fn();
const mockSetModalPopupTarget = jest.fn();

const defaultProps = {
  studioBaseUrl: 'https://example.com',
  logoutUrl: 'https://example.com/logout',
  onNavigate: mockOnNavigate,
  setModalPopupTarget: mockSetModalPopupTarget,
  toggleModalPopup: mockToggleModalPopup,
  searchButtonAction: mockSearchButtonAction,
  username: 'testuser',
  authenticatedUserAvatar: 'avatar.png',
  isAdmin: true,
  isMobile: false,
  isHiddenMainMenu: false,
  mainMenuDropdowns: [],
  logo: 'logo.png',
  logoAltText: 'Test Logo',
  number: '101',
  org: 'EDX',
  title: 'Test Course',
  outlineLink: '/courses/edx/course-101',
};

const RootWrapper = (props) => (
  <MemoryRouter>
    <IntlProvider locale="en" messages={{}}>
      <HeaderBody {...props} />
    </IntlProvider>
  </MemoryRouter>
);

describe('HeaderBody Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo and brand navigation', () => {
    render(<RootWrapper {...defaultProps} />);

    const logoImage = screen.getByAltText(defaultProps.logoAltText);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', defaultProps.logo);
  });

  it('renders course lockup information', () => {
    render(<RootWrapper {...defaultProps} />);

    const courseTitle = screen.getByText(defaultProps.title);
    const courseOrgNumber = screen.getByText(`${defaultProps.org} ${defaultProps.number}`);

    expect(courseTitle).toBeInTheDocument();
    expect(courseOrgNumber).toBeInTheDocument();
  });

  it('renders a course lock-up link with the correct outline URL', () => {
    render(<RootWrapper {...defaultProps} />);

    const courseLockUpLink = screen.getByTestId('course-lock-up-block');
    expect(courseLockUpLink.getAttribute('href')).toBe(defaultProps.outlineLink);
  });

  it('displays search button and triggers searchButtonAction on click', () => {
    render(<RootWrapper {...defaultProps} />);

    const searchButton = screen.getByLabelText(messages['header.label.search.nav'].defaultMessage);
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(mockSearchButtonAction).toHaveBeenCalled();
  });

  it('displays user menu with username and avatar', () => {
    render(<RootWrapper {...defaultProps} />);

    const userMenu = screen.getByText(defaultProps.username);
    const avatarImage = screen.getByAltText(defaultProps.username);

    expect(userMenu).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', defaultProps.authenticatedUserAvatar);
  });

  it('toggles mobile menu popup when button is clicked in mobile view', () => {
    render(<RootWrapper {...defaultProps} isMobile isModalPopupOpen={false} />);

    const menuButton = screen.getByTestId('mobile-menu-button');
    fireEvent.click(menuButton);

    expect(mockToggleModalPopup).toHaveBeenCalled();
  });
});
