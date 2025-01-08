import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import getCourseLogoOrg from './api';
import { initializeMockApp } from '../../setupTest';

jest.mock('@edx/frontend-platform/auth');

class CustomError extends Error {
  constructor(httpErrorStatus) {
    super();
    this.customAttributes = {
      httpErrorStatus,
    };
  }
}

describe('getCourseLogoOrg', () => {
  beforeEach(async () => {
    // We need to mock AuthService to implicitly use `getAuthenticatedHttpClient` within `AppContext.Provider`.
    await initializeMockApp();
    delete window.location;
    getAuthenticatedHttpClient.mockReset();
    getAuthenticatedUser.mockReset();
  });

  it('should return the organization logo when the URL is valid', async () => {
    window.location = new URL(`${getConfig().BASE_URL}/learning/course/course-v1:edX+DemoX+Demo_Course/home`);
    getAuthenticatedUser.mockImplementation(() => ({ username: 'someone' }));
    getAuthenticatedHttpClient.mockReturnValue({
      get: async () => Promise.resolve({
        data: {
          logo: 'https://example.com/logo.svg',
        },
      }),
    });
    const logoOrg = await getCourseLogoOrg();
    expect(logoOrg).toBe('https://example.com/logo.svg');
  });

  it('should return null when the organization logo is not found', async () => {
    window.location = new URL(`${getConfig().BASE_URL}/learning/course/course-v1:edX+DemoX+Nonexistent_Course/home`);
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
    window.location = new URL(`${getConfig().BASE_URL}/learning/course/course-v1:edX+DemoX+Demo_Course/home`);
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
    getAuthenticatedUser.mockImplementation(() => ({ username: 'someone' }));
    const customError = new CustomError(500);
    window.location = new URL(`${getConfig().BASE_URL}/learning/course/course-v1:edX+DemoX+Demo_Course/home`);
    getAuthenticatedHttpClient.mockReturnValue({
      get: async () => {
        throw customError;
      },
    });
    await expect(getCourseLogoOrg()).rejects.toThrow(customError);
  });
});
