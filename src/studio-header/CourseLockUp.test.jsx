import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import CourseLockUp from './CourseLockUp';
import messages from './messages';

const mockOnNavigate = jest.fn();
const mockProps = {
  number: '101',
  org: 'EDX',
  title: 'Course Title',
  outlineLink: 'https://example.com/course-outline',
  onNavigate: mockOnNavigate,
};

describe('CourseLockUp Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithIntl = (component) => (
    render(
      <IntlProvider locale="en" messages={messages}>
        {component}
      </IntlProvider>,
    )
  );

  it('renders course org, number, and title', () => {
    renderWithIntl(<CourseLockUp {...mockProps} />);

    const courseOrgNumber = screen.getByTestId('course-org-number');
    const courseTitle = screen.getByTestId('course-title');

    expect(courseOrgNumber).toBeInTheDocument();
    expect(courseOrgNumber).toHaveTextContent(`${mockProps.org} ${mockProps.number}`);
    expect(courseTitle).toBeInTheDocument();
    expect(courseTitle).toHaveTextContent(mockProps.title);
  });

  it('renders the link with correct aria-label', () => {
    renderWithIntl(<CourseLockUp {...mockProps} />);

    const link = screen.getByTestId('course-lock-up-block');
    expect(link).toHaveAttribute(
      'aria-label',
      messages['header.label.courseOutline'].defaultMessage,
    );
  });

  it('navigates to an absolute URL when clicked', () => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: '' };

    renderWithIntl(<CourseLockUp {...mockProps} />);

    const link = screen.getByTestId('course-lock-up-block');
    fireEvent.click(link);

    expect(window.location.href).toBe(mockProps.outlineLink);
  });

  it('calls onNavigate for relative URLs', () => {
    const relativeUrl = '/courses/edx/course-v1-101/';

    renderWithIntl(
      <CourseLockUp
        {...mockProps}
        outlineLink={relativeUrl}
      />,
    );

    const link = screen.getByTestId('course-lock-up-block');
    fireEvent.click(link);

    expect(mockOnNavigate).toHaveBeenCalledWith(relativeUrl);
  });
});
