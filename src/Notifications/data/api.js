/* eslint-disable import/prefer-default-export */
// import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

export const getApiBaseUrl = () => getConfig().LMS_BASE_URL;

export async function getCourseTopics() {
  // const url = `${getApiBaseUrl()}/api/discussion/v1/notifications/`;

  // const { data } = await getAuthenticatedHttpClient()
  //   .get(url);

  const data = [{
    TODAY: [
      {
        type: 'post',
        respondingUser: 'SCM_Lead',
        notificationContent: 'Hello and welcome to SC0x!',
        targetUser: '',
        courseName: 'Supply Chain Analytics',
        URL: '',
        status: 'unread',
        time: '15m',
      },
      {
        type: 'help',
        respondingUser: 'MITx_Learner',
        notificationContent: 'What grade does a student need to get in order to pass the course and earn a certificate?',
        targetUser: '',
        courseName: 'Supply Chain Analytics',
        URL: '',
        status: 'unread',
        time: '15m',
      },
    ],
  }];
  return data;
}
