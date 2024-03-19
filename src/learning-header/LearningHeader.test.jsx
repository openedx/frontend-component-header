import React from 'react';
import {
  authenticatedUser, initializeMockApp, render, screen, waitFor,
} from '../setupTest';
import { LearningHeader as Header } from '../index';

jest.mock('./data/api', () => ({
  getCourseLogoOrg: jest.fn().mockResolvedValue(Promise.resolve('logo-url')),
}));

describe('Header', () => {
  beforeAll(async () => {
    // We need to mock AuthService to implicitly use `getAuthenticatedUser` within `AppContext.Provider`.
    await initializeMockApp();
  });

  it('displays user button', () => {
    render(<Header />);
    expect(screen.getByText(authenticatedUser.username)).toBeInTheDocument();
  });

  it('displays course data', () => {
    const courseData = {
      courseOrg: 'course-org',
      courseTitle: 'course-title',
    };
    render(<Header {...courseData} />);
    waitFor(
      () => {
        expect(screen.getByAltText(`${courseData.courseOrg} logo`)).toHaveAttribute('src', 'logo-url');
        expect(screen.getByText(`${courseData.courseOrg}`)).toBeInTheDocument();
        expect(screen.getByText(courseData.courseTitle)).toBeInTheDocument();
      },
    );
  });
});
