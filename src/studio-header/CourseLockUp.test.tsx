import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { MemoryRouter } from 'react-router-dom';

import CourseLockUp from './CourseLockUp';
import messages from './messages';

const mockProps = {
  number: '101',
  org: 'EDX',
  title: 'Course Title',
  outlineLink: 'https://example.com/course-outline',
};

const RootWrapper = (props) => (
  <MemoryRouter>
    <IntlProvider locale="en" messages={{}}>
      <CourseLockUp {...props} />
    </IntlProvider>
  </MemoryRouter>
);

describe('CourseLockUp Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders course org, number, and title', () => {
    render(<RootWrapper {...mockProps} />);

    const courseOrgNumber = screen.getByTestId('course-org-number');
    const courseTitle = screen.getByTestId('course-title');

    expect(courseOrgNumber).toBeInTheDocument();
    expect(courseOrgNumber).toHaveTextContent(`${mockProps.org} ${mockProps.number}`);
    expect(courseTitle).toBeInTheDocument();
    expect(courseTitle).toHaveTextContent(mockProps.title);
  });

  it('renders the link with correct aria-label', () => {
    render(<RootWrapper {...mockProps} />);

    const link = screen.getByTestId('course-lock-up-block');
    expect(link).toHaveAttribute(
      'aria-label',
      messages['header.label.courseOutline'].defaultMessage,
    );
  });

  it('navigates to an absolute URL when clicked', () => {
    render(<RootWrapper {...mockProps} />);

    // FIXME: don't use testId - https://testing-library.com/docs/queries/about#priority
    const link = screen.getByTestId('course-lock-up-block') as HTMLAnchorElement;
    expect(link.href).toBe(mockProps.outlineLink);
  });
});
