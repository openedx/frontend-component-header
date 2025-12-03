import { logError } from '@edx/frontend-platform/logging';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import getCourseLogoOrg from './api';
import { initializeMockApp } from '../../setupTest';

jest.mock('@edx/frontend-platform/auth');
jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn(),
}));

class CustomError extends Error {
  constructor(httpErrorStatus) {
    super();
    this.customAttributes = {
      httpErrorStatus,
    };
  }
}

describe('getCourseLogoOrg', () => {
  beforeAll(async () => {
    // We need to mock AuthService to implicitly use `getAuthenticatedHttpClient` within `AppContext.Provider`.
    await initializeMockApp();
  });

  beforeEach(() => {
    getAuthenticatedHttpClient.mockReset();
    getAuthenticatedUser.mockReset();
    logError.mockReset();
  });

  it('should return the organization logo when the URL is valid', async () => {
    // Use history.pushState to change the URL
    window.history.pushState({}, '', '/learning/course/course-v1:edX+DemoX+Demo_Course/home');

    getAuthenticatedUser.mockImplementation(() => ({ username: 'someone' }));
    const mockGet = jest.fn().mockResolvedValue({
      data: {
        logo: 'https://example.com/logo.svg',
      },
    });
    getAuthenticatedHttpClient.mockReturnValue({
      get: mockGet,
    });
    const logoOrg = await getCourseLogoOrg();
    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining('/api/organizations/v0/organizations/edX/'),
      { useCache: true },
    );
    expect(logoOrg).toBe('https://example.com/logo.svg');
  });

  it('should return null when the organization logo is not found', async () => {
    window.history.pushState({}, '', '/learning/course/course-v1:edX+DemoX+Nonexistent_Course/home');
    getAuthenticatedUser.mockImplementation(() => ({ username: 'someone' }));
    getAuthenticatedHttpClient.mockReturnValue({
      get: async () => {
        throw new CustomError(404);
      },
    });
    const logoOrg = await getCourseLogoOrg();
    expect(logoOrg).toBeNull();
  });

  it('should return null if the user is not authenticated', async () => {
    window.history.pushState({}, '', '/learning/course/course-v1:edX+DemoX+Demo_Course/home');
    getAuthenticatedUser.mockImplementation(() => ({}));
    getAuthenticatedHttpClient.mockReturnValue({
      get: async () => Promise.resolve({
        data: {
          logo: 'https://example.com/logo.svg',
        },
      }),
    });
    const logoOrg = await getCourseLogoOrg();
    expect(getAuthenticatedHttpClient).not.toHaveBeenCalled();
    expect(logoOrg).toBeNull();
  });

  it('should throw an error when an unexpected error occurs', async () => {
    window.history.pushState({}, '', '/learning/course/course-v1:edX+DemoX+Demo_Course/home');

    getAuthenticatedUser.mockImplementation(() => ({ username: 'someone' }));
    const customError = new CustomError(500);
    getAuthenticatedHttpClient.mockReturnValue({
      get: async () => {
        throw customError;
      },
    });
    const logoOrg = await getCourseLogoOrg();
    expect(logoOrg).toBeNull();
    expect(logError).toHaveBeenCalledWith(customError);
  });
});
