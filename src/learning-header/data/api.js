import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { logError } from '@edx/frontend-platform/logging';

const getCourseLogoOrg = async () => {
  try {
    const orgId = window.location.pathname.match(/course-(.*?):([^+]+)/)[2];
    const { username } = getAuthenticatedUser() ?? {};
    if (username) {
      const { data } = await getAuthenticatedHttpClient()
        .get(
          `${getConfig().LMS_BASE_URL}/api/organizations/v0/organizations/${orgId}/`,
          { useCache: true },
        );
      return data.logo;
    }
  } catch (error) {
    // do not throw the error, just log it, the Course Org Logo is not critical
    logError(error);
  }
  return null;
};

export default getCourseLogoOrg;
